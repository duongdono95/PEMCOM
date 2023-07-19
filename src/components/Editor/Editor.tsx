"use client";

import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import { uploadFiles } from "@/lib/uploadthing";
import {
  PostCreationRequest,
  PostValidator,
} from "@/lib/validators/post";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./Editor.scss";
// import "@/styles/editor.css";
import { EDITOR_TOOLS, useFormImport } from "./EditorTools";
import { customToast } from "@/hooks/toast/customToast";

type FormData = z.infer<typeof PostValidator>;

interface EditorProps {
  subredditId: string;
}

export const Editor: React.FC<EditorProps> = ({
  subredditId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormImport<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: "",
      content: null,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] =
    useState<boolean>(false);
  const pathname = usePathname();

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      title,
      content,
      subredditId,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        title,
        content,
        subredditId,
      };
      const { data } = await axios.post(
        "/api/subreddit/post/create",
        payload
      );
      return data;
    },
    onError: () => {
      return customToast.error(
        "Something went wrong. Your post was not published. Please try again."
      );
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      const newPathname = pathname
        .split("/")
        .slice(0, -1)
        .join("/");
      router.push(newPathname);

      router.refresh();

      return customToast.success(
        "Your post has been published."
      );
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = EDITOR_TOOLS.editorJS;
    const Header = EDITOR_TOOLS.header;
    const Embed = EDITOR_TOOLS.embed;
    const Table = EDITOR_TOOLS.table;
    const List = EDITOR_TOOLS.list;
    const Code = EDITOR_TOOLS.code;
    const LinkTool = EDITOR_TOOLS.linkTool;
    const InlineCode = EDITOR_TOOLS.inlineCode;
    const ImageTool = EDITOR_TOOLS.image;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles(
                    [file],
                    "imageUploader"
                  );

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        customToast.error("Something went wrong.");
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save();
    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      subredditId,
    };

    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="subreddit-post-container">
      <h3>Create a new post</h3>
      <form
        id="subreddit-post-form"
        className=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          ref={(e) => {
            titleRef(e);
            // @ts-ignore
            _titleRef.current = e;
          }}
          {...rest}
          placeholder="Title"
          className="form-title"
        />
        <div id="editor" className="" />
        <p className="bottom-line">
          Use
          <b> Tab </b>
          to open the command menu.
        </p>
      </form>
    </div>
  );
};

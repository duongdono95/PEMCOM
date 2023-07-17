import Checklist from '@editorjs/checklist';
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Header from "@editorjs/header";
import { useForm } from "react-hook-form";
import EditorJS from "@editorjs/editorjs";
import Table from '@editorjs/table';
import Code from '@editorjs/code'

export const EDITOR_TOOLS = {
  Code: Code,
  checklist: Checklist,
  editorJS: EditorJS,
  simpleImage: SimpleImage,
  header: Header,
  list: List,
  linkTool: LinkTool,
  inlineCode: InlineCode,
  image: Image,
  embed: Embed,
  delimiter: Delimiter,
  code: Code,
  quote: Quote,
  table: Table
};
export const useFormImport = useForm
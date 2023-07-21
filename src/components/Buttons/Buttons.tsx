import React from 'react';
import './Buttons.scss';
import Link from 'next/link';
import { ChevronLeft, Loader, X, ArrowBigDown, ArrowBigUp, Send, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { VoteType } from '@prisma/client';

interface GeneralButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: any;
  disabled?: boolean;
  isPrimary?: boolean;
  isLoading?: boolean;
}

const GeneralButton = React.forwardRef<HTMLButtonElement, GeneralButtonProps>(
  ({ isLoading, isPrimary, content, disabled, ...props }, ref) => {
    return (
      <button className={`${isPrimary ? 'primary' : 'secondary'}-button`} disabled={disabled} ref={ref} {...props}>
        {isLoading ? (
          <span className="loading">
            <Loader />
          </span>
        ) : (
          content
        )}
      </button>
    );
  },
);
GeneralButton.displayName = 'Button';

const BackButton = ({ ...props }) => {
  const router = useRouter();
  return (
    <div className="back-btn" onClick={() => router.back()}>
      <ChevronLeft /> Back
    </div>
  );
};

const CloseButton = () => {
  const router = useRouter();
  return (
    <div className="x-btn" onClick={() => router.back()}>
      <X color="white" strokeWidth={3} />
    </div>
  );
};
const VoteUpButton = ({
  currentVote,
  onClick,
}: {
  currentVote?: VoteType | null | undefined;
  onClick?: () => void;
}) => {
  return (
    <div className="vote-up-button">
      <ArrowBigUp
        fill={currentVote === 'UP' ? 'var(--signature)' : 'white'}
        color={currentVote === 'UP' ? 'var(--signature)' : 'var(--black05)'}
        onClick={onClick}
      />
    </div>
  );
};
const VoteDownButton = ({
  currentVote,
  onClick,
}: {
  currentVote?: VoteType | null | undefined;
  onClick?: () => void;
}) => {
  return (
    <div className="vote-down-button">
      <ArrowBigDown
        fill={currentVote === 'DOWN' ? 'var(--signature)' : 'white'}
        color={currentVote === 'DOWN' ? 'var(--signature)' : 'var(--black05)'}
        onClick={onClick}
      />
    </div>
  );
};
const SendButton = ({
  disabled,
  onClick,
  isLoading,
}: {
  disabled: boolean;
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <button className="send-btn" disabled={disabled} onClick={onClick}>
      {isLoading ? <Loader2 className="animate-spin" /> : <Send color="var(--signature)" />}
    </button>
  );
};
export const Buttons = {
  general: GeneralButton,
  google: () => (
    <div className="google-auth-btn">
      <div
        style={{
          backgroundImage:
            'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/32px-Google_%22G%22_Logo.svg.png)',
        }}
        className="google-icon"
      ></div>
      Google
    </div>
  ),
  back: BackButton,
  close: CloseButton,
  backToHome: () => (
    <Link className="back-to-home" href="/">
      <ChevronLeft />
      Home
    </Link>
  ),
  voteUp: VoteUpButton,
  voteDown: VoteDownButton,
  sendBtn: SendButton,
};

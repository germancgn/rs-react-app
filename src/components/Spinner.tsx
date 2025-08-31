import { SpinnerGap } from './Icon';

type SpinnerProps = {
  size: number;
};

export default function Spinner({ size }: SpinnerProps) {
  return (
    <span className="block spinner">
      <SpinnerGap size={size} />
    </span>
  );
}

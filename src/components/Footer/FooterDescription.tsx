type Props = {
  description: string;
};

export default function FooterDescription({ description }: Props) {
  return (
    <div>
      <p>{description}</p>
    </div>
  );
}

type Props = {
  params: { storeId: string };
};

export default function DashBoardPage({ params: { storeId } }: Props) {
  return <div>{storeId}</div>;
}

export type Props = { title: string };

export default function (props: Props) {
  return (
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
    </div>
  );
}

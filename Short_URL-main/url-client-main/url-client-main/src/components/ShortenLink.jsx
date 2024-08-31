import copy from "copy-to-clipboard";
import { LuClipboardCopy } from "react-icons/lu";

function ShortenLink(props) {
  const { data } = props;

  const copyToClipboard = (value) => {
    let copyText = "https://url-api-ashy.vercel.app/" + value;
    let isCopy = copy(copyText);
    if (isCopy) {
      alert(`Short URL Copied  ${copyText}`);
    }
  };

  return (
    <>
      <h1 className="self-center text-2xl font-bold">Shorten Links</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full sm:w-3/4">
          <thead className="bg-green-900 text-white">
            <tr>
              <th className="border-[1px] border-black p-2">LongURL</th>
              <th className="border-[1px] border-black p-2">ShortURL</th>
              <th className="border-[1px] border-black p-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr key={data.id} id={data.id} className="bg-green-100 text-sm">
                <td className="text-wrap border-[1px] border-gray-800 p-2">
                  Loading...
                </td>
                <td className="flex items-center justify-between gap-2 text-wrap border-[1px] border-gray-800 p-2 text-center text-red-600">
                  Loading...
                  <button onClick={() => copyToClipboard(data.shorturlid)}>
                    <LuClipboardCopy className="cursor-pointer text-lg text-black transition-all ease-in hover:scale-110" />
                  </button>
                </td>
                <td className="text-wrap border-[1px] border-gray-800 p-2 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              data.toReversed().map((data) => (
                <tr key={data.id} id={data.id} className="bg-green-100 text-sm">
                  <td className="text-wrap border-[1px] border-gray-800 p-2">
                    {data.longurl}
                  </td>
                  <td className="flex items-center justify-between gap-2 text-wrap border-[1px] border-gray-800 p-2 text-center text-red-600">
                    <a
                      href={
                        "https://url-api-ashy.vercel.app/" + data.shorturlid
                      }
                      target="_blank"
                    >
                      {data.shorturlid}
                    </a>
                    <button onClick={() => copyToClipboard(data.shorturlid)}>
                      <LuClipboardCopy className="cursor-pointer text-lg text-black transition-all ease-in hover:scale-110" />
                    </button>
                  </td>
                  <td className="text-wrap border-[1px] border-gray-800 p-2 text-center">
                    {data.count}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShortenLink;

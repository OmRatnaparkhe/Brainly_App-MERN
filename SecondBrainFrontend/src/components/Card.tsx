import axios from "axios";
import { DeleteIcon } from "../icons/deleteIcon";
import { ShareIcon } from "../icons/share";
import { DeleteButton } from "./UI/DeleteButton";
import { BACKEND_URL } from "../config";


interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document";
  text: string;
}

export const CardComponent = ({ title, link, type, id, text }: CardProps) => {
  async function deleteCard() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete card. Please try again.");
    }
  }
  return (
    <div className="min-w-80 max-w-[25%] min-h-[15rem] max-h-[20rem]"> {/* Fixed width and height on the outer div */}
      <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col overflow-hidden h-full"> {/* Ensure inner div takes full height */}
        <div className="flex justify-between mb-2">
          <div className="flex gap-x-4 ">
            <a href={link}>
              <ShareIcon size="md" />
            </a>
            <span className="font-bold  text-lg">{title}</span>
          </div>
          <div className="flex gap-x-3  text-black">
            <DeleteButton onClick={deleteCard} Icon={<DeleteIcon />} />
          </div>
        </div>
        <div className="overflow-auto w-full h-full"> {/* Make the content area scrollable and take full remaining height */}
          <div className="mt-6">
            {type == "youtube" && (
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={link.replace("watch", "embed").replace("?v=", "/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {type == "twitter" && (
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            )}

            {text && (
              <div className="mt-4 text-md font-medium text-gray-700 whitespace-pre-line break-words">
                {text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
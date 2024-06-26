import { FormEvent, ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postBlog } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { X, Image } from "lucide-react";

function NewBlog() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState<File | null>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title || !category || !content || !cover) {
            setError("All fields are required.");
            return;
        }
        setError("");

        const data = await postBlog({ title, category, content, image: cover });

        if (data.success) {
            navigate(`/blogs/${data.data._id}`);
        }
    };

    const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCover(event.target.files[0]);
        }
    };

    const removeCoverImage = () => {
        setCover(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 shadow-md rounded-md"
        >
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center">
                <label
                    htmlFor="cover-input"
                    className="text-lg text-gray-700 dark:text-gray-200 bg-transparent cursor-pointer"
                >
                    {cover ? (
                        <img
                            src={cover && URL.createObjectURL(cover).toString()}
                            alt="Image Preview"
                            className="w-80 h-48 m-2 rounded flex items-center justify-evenly"
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Image />
                            Add Cover
                        </div>
                    )}
                </label>
                <input
                    id="cover-input"
                    type="file"
                    accept="image/*"
                    value={cover ? undefined : ""}
                    onChange={handleCoverChange}
                    className="hidden"
                />
                {cover && (
                    <button
                        type="button"
                        onClick={removeCoverImage}
                        disabled={!cover}
                        className={`font-bold text-gray-700 dark:text-gray-200 bg-transparent rounded hover:text-red-700`}
                        aria-label="Remove Cover Image"
                    >
                        <X />
                    </button>
                )}
            </div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title...."
                className="mt-1 block w-full text-3xl outline-none rounded-md text-gray-700 dark:text-gray-200 bg-transparent shadow-sm py-1"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category 1, Category 2,....."
                className="mt-1 block w-full text-2xl outline-none rounded-md text-gray-700 dark:text-gray-200 bg-transparent shadow-sm py-1"
            />
            <div className="h-[500px]">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    className="h-5/6 bg-transparent w-full text-xl rounded-md my-2 lg:my-1"
                />
            </div>
            <div className="flex justify-center items-center">
                <input
                    type="submit"
                    value="Submit"
                    className="px-4 py-2 font-bold text-xl cursor-pointer text-white bg-pink-500  hover:bg-pink-700 rounded-md -mt-810"
                />
            </div>
        </form>
    );
}

export default NewBlog;
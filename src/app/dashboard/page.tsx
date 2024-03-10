"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MeteorCard } from "@/components/MeteorCard";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/userAtoms";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface SnippetType {
  _id: string;
  snippetName: string;
  language: string;
  snippet: string;
}

const Page = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(false);
  const [snippetData, setSnippet] = useState<{
    snippetName: string;
    language: string;
  }>({ snippetName: "", language: "" });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const handleSnippetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, snippetname: "" }));
    setSnippet({ ...snippetData, snippetName: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, language: "" }));
    setSnippet({ ...snippetData, language: e.target.value });
  };

  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!isLoggedIn) {
        router.push("/login");
      }
    };

    checkUserStatus();
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) {
      return; // If not logged in, do nothing
    }
    const allSnippets = async () => {
      try {
        const res = await axios.get("/api/snippets/getusersnippets");
        setSnippets(res.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Error fetching snippets"); // Set error message
        setLoading(false); // Set loading to false in case of error
      }
    };
    allSnippets();
  }, [isLoggedIn]);

  const makeSnip = async () => {
    setDisable(true);
    try {
      console.log("Entered");

      const res = await axios.post(
        "http://localhost:3000/api/snippets/makesnippet",
        snippetData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      if (res.data.id) {
        toast.success(res.data.message);
        closeModal();
        router.push(`/snippet/${res.data.id}`);
      } else {
        toast.error(res.data.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDisable(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    // Validate snippet name
    if (!snippetData.snippetName.trim()) {
      errors.snippetname = "Snippet name is required";
    }

    // Validate language
    if (!snippetData.language.trim()) {
      errors.language = "Language is required";
    }

    if (Object.keys(errors).length === 0) {
      await makeSnip();
    } else {
      setFormErrors(errors);
    }
  };

  const updatedSnippets = (data: SnippetType[]) => {
    setLoading(true);
    setSnippets(data);
    setLoading(false);
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="min-h-screen h-auto  w-full dark:bg-white bg-black  dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative ">
      {isLoggedIn && (
        <>
          <div
            className="AddSnippet sm:flex sm:justify-end p-4"
            onClick={openModal}
          >
            <button className="px-8 py-2 rounded-full relative bg-transparent text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Add Snippet</span>
            </button>
          </div>
        </>
      )}
      <div className="heading">
        <h1 className="text-center text-white text-4xl font-extrabold py-4 bg-transparent shadow-md rounded-md  uppercase transform   transition duration-500">
          Snippets
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center text-white text-xl font-semibold py-8">
          <motion.div
            className="flex justify-center items-center h-auto p-auto "
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.5, loop: Infinity, ease: "linear" }}
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping delay-100"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-ping delay-200"></div>
            </div>
          </motion.div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-white text-xl font-semibold py-8">
          Error: {error}
        </div>
      ) : (
        <>
          <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10 px-4 lg:px-10">
            {snippets.length > 0 ? (
              snippets.map((snippet: SnippetType, index: number) => (
                <div className="card-wrapper" key={index}>
                  <MeteorCard
                    snippet={snippet}
                    updatedSnippets={updatedSnippets}
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center text-center py-8">
                <p className="text-gray-300 text-xl font-semibold">
                  Add your first snippet!
                </p>
              </div>
            )}
          </div>{" "}
        </>
      )}

      {modal && (
        <>
          <div className="w-full h-screen fixed inset-0 z-40 bg-black bg-opacity-50"></div>
          <div className="modal">
            <div className="h-screen w-full fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white max-w-md w-full mx-auto rounded-none md:rounded-2xl  p-4 md:p-8 shadow-input bg-transparent">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Code Snippet
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Make your own snippet here...
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="snippetname">Snippet Name</Label>
                    <Input
                      id="snippetname"
                      placeholder="Flask Snippet"
                      type="text"
                      onChange={handleSnippetNameChange}
                    />
                    {formErrors.snippetname && (
                      <p className="text-sm text-red-500">
                        {formErrors.snippetname}
                      </p>
                    )}
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="language">Language</Label>
                    <Input
                      id="language"
                      placeholder="Javascript,Rust,Python..."
                      type="text"
                      onChange={handleLanguageChange}
                    />
                    {formErrors.language && (
                      <p className="text-sm text-red-500">
                        {formErrors.language}
                      </p>
                    )}
                  </LabelInputContainer>
                  <div className="btnContainer flex gap-3">
                    <button
                      disabled={disable}
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit"
                    >
                      Snip it &rarr;
                      <BottomGradient />
                    </button>
                    <button
                      className="bg-white relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] border-black border-1"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

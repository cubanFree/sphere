import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";
import fetchUser from "@/app/lib/data";
import { SlOptionsVertical } from "react-icons/sl";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import OptionDesign from "./optionDesign";
import ModalShowAvatar from "./modalShowAvatar";
import { FaUserEdit } from "react-icons/fa";
import { getTimeAgo } from "@/app/ui/general/getTimeAgo";
import { MdDateRange } from "react-icons/md";

export default async function HeaderProfile({ id }) {

	const data = id && await fetchUser({id})
	const { full_name, user_name, avatar_url, description, followers, following, created_at } = data || {};

	const getTime = getTimeAgo(created_at)

	return (
		data ? (
			<div className="w-full flex justify-start items-start gap-4">
				<ModalShowAvatar avatar_url={avatar_url}/>
				<div className="w-full h-full flex flex-col justify-between gap-3 text-sm">
					<div className="w-full flex flex-col gap-2">
						<div className="w-full flex flex-col justify-center items-start">
							<div className="w-full flex items-center">
								<span className="w-full text-2xl flex justify-start items-center">{full_name || 'Unknown'}</span>
								<div className="w-full flex justify-end items-center gap-4">
									<Link
										href="/home/profile/edit"
										className="flex justify-center items-center sm:py-1 px-4 border border-gray-800 rounded-full hover:border-gray-700"
										>
											<FaUserEdit className="text-2xl sm:hidden" />
											<span className="hidden sm:flex">Edit profile</span>
									</Link>
									<Popover
										showArrow
										offset={10}
										placement="bottom"
										>
											<PopoverTrigger>
												<button className="focus:outline-none">
													<SlOptionsVertical />
												</button>
											</PopoverTrigger>
											<PopoverContent className="bg-gray-800 p-0">
												<OptionDesign />
											</PopoverContent>
									</Popover>
								</div>
							</div>
							<span className="text-gray-400">@{user_name || 'unknown'}</span>
						</div>
						<div className="w-full flex justify-start items-center">
							<Link href={`/home/profile/followers`} className="text-gray-400 flex gap-2 border-l-2 border-gray-900 hover:border-gray-800 px-2"><p className="font-bold">{followers ? followers.length : 0}</p> followers</Link>
							<Link href={`/home/profile/following`} className="text-gray-400 flex gap-2 border-r-2 border-gray-900 hover:border-gray-800 px-2"><p className="font-bold">{following ? following.length : 0}</p> following</Link>
						</div>
						<div className="w-full flex justify-start items-center gap-2">
							<MdDateRange size={16} className="text-gray-500" />
							<span className="text-gray-400">joined since {getTime}</span>
						</div>
					</div>
					<span className="text-gray-300 text-[1rem] whitespace-pre-line">{description ? description : "No description"}</span>
				</div>
			</div>
		) : (
			<div className="w-full flex flex-col gap-2 justify-center items-center">
				<span className="text-gray-400">An error occurred while obtaining the data profile</span>
				<MdErrorOutline size={24} className="text-gray-400" />
			</div>
		)
	)
}
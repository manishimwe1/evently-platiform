import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/type";
import Image from "next/image";
import React from "react";

const EventDetails = async ({
	params: { id },
}: SearchParamProps) => {
	const event = await getEventById(id);
	// console.log(event);

	return (
		<section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
			<div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl wrapper'>
				<Image
					src={event.imageUrl}
					alt='hero image'
					width={1000}
					height={1000}
					className='h-full min-h-[300px] object-cover object-center rounded-md '
				/>
				<div className='flex w-full flex-col gap-8 p-5 md:p-10'>
					<div className='flex flex-col gap-6'>
						<h2 className='h2-bold'>
							{event.title}
						</h2>

						<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
							<div className='flex gap-3'>
								<p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>
									{event.isFree
										? "FREE"
										: `${event.price} rwf`}
								</p>
								<p className='p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-grey-500'>
									{event.category.name}
								</p>
							</div>
							<p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
								by{" "}
								<span>
									{
										event.organizer
											.firstName
									}{" "}
									{
										event.organizer
											.lastName
									}
								</span>
							</p>
						</div>
					</div>

					{/* TODO: CHECKOUT BTN*/}
					<div className='flex flex-col gap-5'>
						<div className='flex gap-2 md:gap-3'>
							<Image
								src={
									"/assets/icons/calendar.svg"
								}
								alt='calenda'
								width={32}
								height={32}
							/>
							<div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center flex-col'>
								<p>
									{
										formatDateTime(
											event.startDateTime,
										).dateOnly
									}{" "}
									{
										formatDateTime(
											event.startDateTime,
										).timeOnly
									}
								</p>

								<p className=''>
									{
										formatDateTime(
											event.endDateTime,
										).dateOnly
									}
									{
										formatDateTime(
											event.endDateTime,
										).timeOnly
									}
								</p>
							</div>
						</div>
						<div className='p-regular-20 flex items-center gap-3'>
							<Image
								src='/assets/icons/location.svg'
								alt='locotion'
								width={32}
								height={32}
							/>
							<p className='p-medium-16 lg:p-regular-20'>
								{event.location}
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='p-bold-20 text-slate-600'>
							What You'll Learn
						</p>
						<p className='p-medium-16 lg:p-regular-18'>
							{event.description}
						</p>
						<p className='p-medium-16 cursor-pointer text-primary-500 underline truncate lg:p-regular-18'>
							{event.url}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventDetails;

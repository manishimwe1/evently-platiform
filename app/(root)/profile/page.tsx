import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;
	const organizerEvents = await getEventsByUser({
		userId,
		page: 1,
	});
	return (
		<>
			<section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
				<div className='wrapper flex items-center justify-center sm:justify-between'>
					<h3 className='h2-bold text-center sm:text-left'>
						My Ticket
					</h3>
					<Button
						asChild
						className='button hidden sm:flex'>
						<Link href={"/#events"}>
							Explore more Events
						</Link>
					</Button>
				</div>
			</section>
			<section className='wrapper my-8'>
				{/* <Collection
					data={events?.data}
					emptyTitle='No Events Tickets purchased yet!'
					emptyStateSubtext='No worries - plenty of exciting events to explore!'
					collectionType='My_tickets'
					limit={3}
					page={1}
					totalPage={2}
					urlParamsName='ordersPage'
					totalPage={2}
				/> */}
			</section>

			<section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
				<div className='wrapper flex items-center justify-center sm:justify-between'>
					<h3 className='h2-bold text-center sm:text-left'>
						Events Organized
					</h3>
					<Button
						asChild
						className='button hidden sm:flex'>
						<Link href={"/events/create"}>
							Create New Events
						</Link>
					</Button>
				</div>
			</section>
			<section className='wrapper my-8'>
				<Collection
					data={organizerEvents?.data}
					emptyTitle='No Events have been created yet!'
					emptyStateSubtext='Go create some now'
					collectionType='Events_Organized'
					limit={3}
					page={1}
					totalPage={2}
					urlParamsName='eventsPage'
				/>
			</section>
		</>
	);
};

export default ProfilePage;

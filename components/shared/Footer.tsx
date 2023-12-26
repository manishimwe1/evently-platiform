import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className='border-t'>
			<div className='flex-center wrapper text-center sm:flex-row flex-between flex flex-col gap-4 p-5'>
				<Link href={"/"}>
					<Image
						src={"/assets/images/logo.svg"}
						alt='logo'
						width={128}
						height={38}
					/>
				</Link>
				<p>2023 Evently. All Right reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;

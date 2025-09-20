'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import Icon from '../ui/Icon';

const NavItem = ({ href, icon, label }: { href: string; icon: string; label: string }) => {
	const pathname = usePathname();

	const baseClasses = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
	const inactiveClasses = "text-slate-700 hover:bg-accent hover:text-slate-800";
	const activeClasses = "bg-slate-200 text-slate-900";
	
	return (
		<Link
			href={href}
			draggable={false}
			className={`${baseClasses} ${pathname === href ? activeClasses : inactiveClasses}`}
		>
			<Icon name={icon} className="w-5 h-5 fill-icon" />
			<span>{label}</span>
		</Link>
	);
};

const Navbar = () => {
	const [isNotificationsOpen, setNotificationsOpen] = useState(false);
	const notificationRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
				setNotificationsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [notificationRef]);
	
	return (
		<header className="bg-background-sub backdrop-blur-lg sticky top-0 z-50">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/" className="flex items-center space-x-4" draggable={false}>
          			  	<Icon name="logo" className="w-8 h-8 fill-indigo-600" />
          			  	<span className="text-xl font-bold text-slate-800 tracking-tight">HW CTRL</span>
          			</Link>

					<div className="hidden md:flex items-center space-x-2">
						<NavItem href="/todo" icon="todo" label="Todo" />
						<NavItem href="/analytics" icon="analytics" label="Analytics" />
						<NavItem href="/calendar" icon="calendar" label="Calendar" />
					</div>

					<div className="flex items-center space-x-4">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Icon name="search" className="w-5 h-5 text-slate-400" />
							</div>
							<input
								type="text"
								placeholder="Search..."
								className="block w-full bg-slate-100 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
							/>
						</div>

						<div className="relative" ref={notificationRef}>
							<button 
								onClick={() => setNotificationsOpen(prev => !prev)}
								className="relative p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
								aria-haspopup="true"
								aria-expanded={isNotificationsOpen}
								draggable={false}
							>
								<Icon name="notification" className="w-6 h-6" />
								<span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
							</button>
							{isNotificationsOpen && (
								<div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-20">
									<div className="p-3 border-b border-slate-200">
										<h3 className="font-semibold text-sm">Notifications</h3>
									</div>
									<div className="max-h-80 overflow-y-auto">
										<div className="p-3 flex space-x-3 hover:bg-slate-50 cursor-pointer">
											<div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
												<Icon name="integration" className="w-5 h-5"/>
											</div>
											<div>
												<p className="text-sm"><span className="font-semibold">New Integration:</span> You can now connect Google Classroom.</p>
												<p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
											</div>
										</div>
										<div className="p-3 flex space-x-3 hover:bg-slate-50 cursor-pointer">
											<div className="w-10 h-10 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600">
												<Icon name="calendar" className="w-5 h-5"/>
											</div>
											<div>
												<p className="text-sm"><span className="font-semibold">Deadline Reminder:</span> ENGL 101 Essay Draft is due in 3 days.</p>
												<p className="text-xs text-slate-400 mt-0.5">1 day ago</p>
											</div>
										</div>
										<div className="p-3 flex space-x-3 hover:bg-slate-50 cursor-pointer">
											<div className="w-10 h-10 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center text-green-600">
												<Icon name="check" className="w-5 h-5"/>
											</div>
											<div>
												<p className="text-sm"><span className="font-semibold">Assignment Graded:</span> MTH 261 Problem Set 4 was graded.</p>
												<p className="text-xs text-slate-400 mt-0.5">3 days ago</p>
											</div>
										</div>
									</div>
									<div className="p-2 border-t border-slate-200">
										<Link 
											href="/notifications" 
											onClick={() => setNotificationsOpen(false)} 
											className="block text-center text-sm font-semibold text-indigo-600 hover:bg-slate-100 p-2 rounded-md" 
											draggable={false}
										>
											View All Notifications
										</Link>
									</div>
								</div>
							)}
						</div>

						<Link href="/integrations" className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" draggable={false}>
							<Icon name="integration" className="w-6 h-6" />
						</Link>
						<Link href="/settings" className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors" draggable={false}>
							<Icon name="user" className="w-6 h-6" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
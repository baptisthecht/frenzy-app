import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function test() {
	const cancelButtonRef = useRef(null);

	const error = useSelector((state: any) => state.error.error);
	const errorMessage = useSelector((state: any) => state.error.message);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				window.location.href = "/";
			}, 15000);
		}
	}, [error]);

	return (
		<Transition.Root show={error} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={() => {}}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white p-10 text-left shadow-xl transition-all h-[1400px] w-[800px] border-8 border-primary">
								<div>
									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="font-semibold leading-6 text-gray-900 text-4xl pb-5">
											Aïe...
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-2xl text-gray-500 pb-20">
												Tout ne s'est pas passé comme
												prévu...
											</p>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-center h-[900px] justify-center overflow-y-scroll scroll-gray">
									<span className="text-2xl text-center">
										Oops, nous avons rencontré une erreur...
										<br /> Veuillez passer commande au
										comptoir
									</span>
								</div>
								<div className="flex flex-col w-full justify-center items-center">
									<span className="text-2xl">Erreur :</span>
									<br />
									<span className="text-2xl">
										{errorMessage}
									</span>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

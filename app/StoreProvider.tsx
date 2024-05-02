"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import {AppStore, makeStore} from "@/redux/store";

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();

	// check if store exists, if not create it
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}

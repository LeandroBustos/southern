import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

//COMPONENTS
import { SwipeableNasaCalendar } from "./SwipeableCalendar";

//CONSTANTS
import { CALENDAR_CONSTANTS } from "../../../constants/calendars";

describe("nasa calendar", () => {
	const calendarsFullNames = {
		sol: `${CALENDAR_CONSTANTS.SOL_CALENDAR_NAME} ${CALENDAR_CONSTANTS.CALENDAR_NAME}`,
		earth: `${CALENDAR_CONSTANTS.EARTH_CALENDAR_NAME} ${CALENDAR_CONSTANTS.CALENDAR_NAME}`,
	};

	const calendarDatesFullNames = {
		sol: `${CALENDAR_CONSTANTS.SOL_CALENDAR_NAME} ${CALENDAR_CONSTANTS.DATE_NAME}`,
		earth: `${CALENDAR_CONSTANTS.EARTH_CALENDAR_NAME} ${CALENDAR_CONSTANTS.DATE_NAME}`,
	};

	const calendars = [
		{
			id: CALENDAR_CONSTANTS.SOL_CALENDAR_NAME,
			name: calendarsFullNames.sol,
		},
		{
			id: CALENDAR_CONSTANTS.EARTH_CALENDAR_NAME,
			name: calendarsFullNames.earth,
		},
	];

	const calendarValues = [
		CALENDAR_CONSTANTS.SOL_CALENDAR_NAME,
		CALENDAR_CONSTANTS.EARTH_CALENDAR_NAME,
	];

	const maxDates = {
		[CALENDAR_CONSTANTS.SOL_CALENDAR_NAME]: 3000,
		[CALENDAR_CONSTANTS.EARTH_CALENDAR_NAME]: "2022-04-20",
	};

	const mockSetSelectedItem = jest.fn();
	const mockHandleOnChange = jest.fn();

	describe("sol calendar", () => {
		let component, tab, datePicker;
		afterAll(() => component.unmount());
		beforeAll(() => {
			let nasaCalendar = {
				keyValue: "sol-earth-test",
				differentiator: "curiosity-test",
				dir: "rtl",
				dataTab: [calendars[0]],
				dataPicker: [calendarValues[0]],
				datePickerValue: maxDates,
				maxDates: maxDates,
				selectedItem: 0,
				setSelectedItem: mockSetSelectedItem,
				handleOnChange: mockHandleOnChange,
			};
			component = render(<SwipeableNasaCalendar {...nasaCalendar} />);
			tab = component.getByText(calendarsFullNames.sol);
			datePicker = component.getByText(
				`${CALENDAR_CONSTANTS.TEXT_HELPER_DATE} ${
					maxDates[CALENDAR_CONSTANTS.SOL_CALENDAR_NAME]
				}`,
			);
		});

		const datePickerLabel = new RegExp(calendarDatesFullNames.sol, "i");

		it("sol tab should be functional", () => {
			expect(tab.parentNode).toHaveTextContent(calendarsFullNames.sol);
		});
		it("sol datePicker should be functional", () => {
			expect(datePicker.parentNode).toHaveTextContent(datePickerLabel);
		});
	});

	describe("earth calendar", () => {
		let component, tab, datePicker;
		afterEach(() => component.unmount());
		beforeEach(() => {
			let nasaCalendar = {
				keyValue: "sol-earth-test",
				differentiator: "curiosity-test",
				dir: "rtl",
				dataTab: [calendars[1]],
				dataPicker: [calendarValues[1]],
				datePickerValue: maxDates,
				maxDates: maxDates,
				selectedItem: 0,
				setSelectedItem: mockSetSelectedItem,
				handleOnChange: mockHandleOnChange,
			};
			component = render(<SwipeableNasaCalendar {...nasaCalendar} />);
			datePicker = component.getByLabelText(datePickerLabel);
			tab = component.getByText(calendarsFullNames.earth);
		});

		const datePickerLabel = new RegExp(calendarDatesFullNames.earth, "i");

		it("earth tab should be functional", () => {
			expect(tab.parentNode).toHaveTextContent(calendarsFullNames.earth);
		});
		it("earth datePicker should be functional", () => {
			expect(datePicker.parentNode).toHaveTextContent(datePickerLabel);
		});
	});

	describe("sol and earth calendar", () => {
		let component, tabEarth, tabSol, datePickerSol;
		afterEach(() => component.unmount());
		beforeEach(() => {
			let nasaCalendar = {
				keyValue: "sol-earth-test",
				differentiator: "curiosity-test",
				dir: "rtl",
				dataTab: calendars,
				dataPicker: calendarValues,
				datePickerValue: maxDates,
				maxDates: maxDates,
				selectedItem: 0,
				setSelectedItem: mockSetSelectedItem,
				handleOnChange: mockHandleOnChange,
			};
			component = render(<SwipeableNasaCalendar {...nasaCalendar} />);
			tabSol = component.getByText(calendarsFullNames.sol);
			tabEarth = component.getByText(calendarsFullNames.earth);
			datePickerSol = component.getByText(
				`${CALENDAR_CONSTANTS.TEXT_HELPER_DATE} ${
					maxDates[CALENDAR_CONSTANTS.SOL_CALENDAR_NAME]
				}`,
			);
		});

		const datePickerLabelSol = new RegExp(calendarDatesFullNames.sol, "i");

		it("sol tab should be functional", () => {
			expect(tabSol.parentNode).toHaveTextContent(calendarsFullNames.sol);
		});
		it("sol datePicker should be functional", () => {
			expect(datePickerSol.parentNode).toHaveTextContent(datePickerLabelSol);
		});
		test("earth tab should be functional", () => {
			fireEvent.click(tabEarth);
			expect(tabEarth.parentNode).toHaveTextContent(calendarsFullNames.earth);
		});
	});
});

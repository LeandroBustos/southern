import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders nasa api app", () => {
	render(<App />);
	const linkElement = screen.getByText(/nasa api/i);
	expect(linkElement).toBeInTheDocument();
});

import logo from '/public/ff.png'; // Assuming 'ff.png' is your logo image

export default function ApplicationLogo(props) {
    const svgWidth = 316; // Width of the original SVG (adjust if needed)
    const svgHeight = 316; // Height of the original SVG (adjust if needed)

    const imageReduction = props.reduction || 1; // Default reduction of 1 (no change)

    return (
        <img
            src={logo}
            alt="Application Logo"
            style={{
                width: `${svgWidth * imageReduction}px`,
                height: `${svgHeight * imageReduction}px`,
            }}
            {...props}
        />
    );
}

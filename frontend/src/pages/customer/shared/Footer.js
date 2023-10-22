export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Copyright © WAA Project {year}</p>
            </div>
        </footer>
    );
}
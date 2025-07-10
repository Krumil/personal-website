import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
                <h2 className="text-2xl text-muted-foreground mb-6">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}

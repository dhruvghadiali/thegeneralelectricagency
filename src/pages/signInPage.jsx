import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@ShadcnComponents/button";
import { PageTransition, StaggeredAnimation } from "@ShadcnComponents/page-transitions";
import logo from "@Assets/images/logo.png";
import bgVisual from "@Assets/images/motor3.jpg";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// Removed remember-me per request
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Please enter email and password.");
			return;
		}
		try {
			setSubmitting(true);
			// TODO: Integrate real auth API here
			await new Promise((r) => setTimeout(r, 900));
			console.log({ email, password });
			// On success, navigate as needed
			// navigate("/");
		} catch {
			setError("Sign in failed. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-[100svh] bg-gradient-to-b from-background to-muted/40">
			<PageTransition className="min-h-[100svh]">
				<div className="mx-auto flex min-h-[100svh] w-full max-w-7xl items-stretch lg:px-8">
					{/* Visual panel for large screens */}
					<div className="relative hidden lg:flex my-6 mr-0 flex-1 rounded-2xl rounded-r-none overflow-hidden">
						{/* Background image + overlays */}
						<div className="absolute inset-0">
							<img src={bgVisual} alt="Visual" className="h-full w-full object-cover object-center" />
							<div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/75 to-background/50" />
							<div className="pointer-events-none absolute -right-24 -top-28 h-[40rem] w-[40rem] rounded-full bg-primary/25 blur-3xl" />
							<div className="pointer-events-none absolute -left-28 -bottom-28 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-3xl" />
							{/* angled bottom overlay to reduce empty space */}
							<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent" />
						</div>

						{/* Foreground content */}
						<div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-8 p-10">
							{/* Top-right Home link */}
							<div className="absolute right-6 top-6">
								<Button
									variant="outline"
									size="sm"
									className="backdrop-blur bg-background/60 hover:bg-background/80 ring-1 ring-border/60 gap-2"
									asChild
								>
									<Link to="/" aria-label="Go to Home">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											className="size-4 text-primary"
										>
											<path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M5 10v9h5v-5h4v5h5v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<span className="hidden sm:inline">Home</span>
									</Link>
								</Button>
							</div>
							{/* Logo */}
							<StaggeredAnimation delay={40}>
								<div className="flex items-center gap-3">
									<img src={logo} alt="GEA" className="h-12 w-12 rounded-sm " />
									<span className="font-medium tracking-wide text-4xl text-primary">The General Electric Stores</span>
								</div>
							</StaggeredAnimation>

							{/* Headline */}
							<StaggeredAnimation delay={120}>
								<div className="max-w-3xl">
									<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-primary ring-1 ring-primary/20">
										<span className="size-1.5 rounded-full bg-primary animate-pulse" />
										<span className="text-[11px] font-medium tracking-wide">Welcome!!</span>
									</div>
									<h1 className="text-4xl md:text-6xl font-semibold leading-tight text-primary">
										Powering projects with reliable motors, drives, and pumps
									</h1>
									<p className="mt-4 text-base md:text-lg text-black max-w-2xl">
										Sign in to manage orders, track deliveries, and access support — all in one streamlined dashboard.
									</p>
								</div>
							</StaggeredAnimation>
						</div>
					</div>

					{/* Form panel */}
					<div className="flex w-full items-center justify-center px-6 py-10 sm:px-8 md:px-16 lg:w-[520px] lg:px-10 lg:py-16">
						<div className="w-full max-w-md">
							{/* Header for small/medium screens */}
							<div className="mb-8 lg:hidden">
								<div className="flex items-center gap-3">
									<img src={logo} alt="GEA" className="h-8 w-8 rounded-sm" />
									<span className="text-base font-medium text-muted-foreground">The General Electric Stores</span>
								</div>
								<h1 className="mt-3 text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
									Welcome back
								</h1>
								<div className="mt-2 h-1 w-14 rounded-full bg-primary/60" />
								<p className="mt-2 text-sm sm:text-base text-muted-foreground">
									Sign in to continue
								</p>
							</div>

							<div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
								<form onSubmit={handleSubmit} className="space-y-5">
									{error ? (
										<div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
											{error}
										</div>
									) : null}

									<div className="space-y-2">
										<label htmlFor="email" className="text-sm font-medium text-foreground">
											Email
										</label>
										<input
											id="email"
											type="email"
											placeholder="you@example.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-0 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]"
											autoComplete="email"
											required
										/>
									</div>

									<div className="space-y-2">
										<label htmlFor="password" className="text-sm font-medium text-foreground">
											Password
										</label>
										<input
											id="password"
											type="password"
											placeholder="••••••••"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px]"
											autoComplete="current-password"
											required
										/>
									</div>

									{/* Removed Remember me per request */}

									<Button type="submit" className="w-full" disabled={submitting}>
										{submitting ? (
											<span className="inline-flex items-center gap-2">
												<svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
												</svg>
												Signing in…
											</span>
										) : (
											"Sign in"
										)}
									</Button>

									{/* Removed Create account CTA per request */}
								</form>
							</div>
						</div>
					</div>
				</div>
			</PageTransition>
		</div>
	);
}

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function useTypingEffect(text: string, speed = 40) {
	const [displayed, setDisplayed] = useState('')
	const [done, setDone] = useState(false)

	useEffect(() => {
		let i = 0
		setDisplayed('')
		setDone(false)
		const interval = setInterval(() => {
			if (i < text.length) {
				setDisplayed(text.slice(0, i + 1))
				i++
			} else {
				setDone(true)
				clearInterval(interval)
			}
		}, speed)
		return () => clearInterval(interval)
	}, [text, speed])

	return { displayed, done }
}

function BlinkingCursor({ visible }: { visible: boolean }) {
	return visible ? (
		<span className="animate-pulse text-[var(--accent)]">_</span>
	) : null
}

function App() {
	const heading = useTypingEffect('coming_soon', 80)
	const [showLines, setShowLines] = useState(false)

	useEffect(() => {
		if (heading.done) {
			const timeout = setTimeout(() => setShowLines(true), 300)
			return () => clearTimeout(timeout)
		}
	}, [heading.done])

	const lines = [
		{ prompt: '~', text: 'portfolio is under construction' },
		{ prompt: '~', text: 'check back later for the full site' },
	]

	return (
		<main className="flex h-full w-full items-center justify-center p-4 font-mono">
			<div className="w-full max-w-2xl">
				{/* terminal window */}
				<div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/50">
					{/* title bar */}
					<div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
						<div className="size-3 rounded-full bg-neutral-700" />
						<div className="size-3 rounded-full bg-neutral-700" />
						<div className="size-3 rounded-full bg-neutral-700" />
						<span className="ml-3 text-xs text-neutral-500">~/portfolio</span>
					</div>

					{/* terminal body */}
					<div className="space-y-4 p-6 text-sm leading-relaxed">
						{/* main command */}
						<div>
							<span className="text-neutral-500">$ </span>
							<span className="text-[var(--accent)]">echo</span>
							<span className="text-neutral-300"> {heading.displayed}</span>
							<BlinkingCursor visible={!heading.done} />
						</div>

						{/* output lines */}
						{showLines && (
							<div className="animate-in fade-in slide-in-from-bottom-2 space-y-1 border-l-2 border-neutral-800 pl-4 duration-500">
								{lines.map((line, i) => (
									<div key={i} className="text-neutral-400">
										<span className="text-neutral-600">{line.prompt} </span>
										{line.text}
									</div>
								))}
							</div>
						)}

						{/* status line */}
						{showLines && (
							<div className="animate-in fade-in mt-6 flex items-center gap-2 text-xs duration-700">
								<span className="inline-block size-2 animate-pulse rounded-full bg-[var(--accent)]" />
								<span className="text-neutral-500">building something...</span>
							</div>
						)}

						{/* prompt */}
						{showLines && (
							<div className="animate-in fade-in duration-1000">
								<span className="text-neutral-500">$ </span>
								<BlinkingCursor visible />
							</div>
						)}
					</div>
				</div>

				{/* footer */}
				<p className="mt-6 text-center text-xs text-neutral-600">
					<span className="text-neutral-500">@andrew</span>
					{' · '}
					<span className="text-neutral-700">2026</span>
				</p>
			</div>
		</main>
	)
}

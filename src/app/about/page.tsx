export default function AboutPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-white/80 text-black">
			<div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
				<h1 className="text-4xl font-bold mb-6 text-center font-serif">À propos</h1>
				<p className="mb-4 text-lg">
					Ce projet a été réalisé dans le cadre d’un travail scolaire. Son objectif principal est de mettre en pratique les compétences que j’ai acquises, d’explorer de nouvelles connaissances et de me perfectionner dans leur application.
				</p>
				<p className="mb-4 text-lg">
					Il ne s’agit pas d’un projet à but entrepreneurial ou commercial. Il a uniquement pour vocation de servir de support d’apprentissage, d’expérimentation et de démonstration de mes capacités techniques et créatives.
				</p>
				<p className="mb-4 text-lg">
					En développant ce projet, je souhaite progresser, tester mes compétences dans un contexte concret et partager le résultat de mon travail.
				</p>
				<p className="mt-6 text-center text-xl font-semibold">Merci de votre visite et de votre intérêt !</p>
			</div>
		</div>
	);
}

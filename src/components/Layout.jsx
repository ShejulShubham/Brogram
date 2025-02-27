export default function Layout(props) {
    const { children } = props

    const header = (
        <header>
            <h1 className="text-gradient">The Brogram</h1>
            <p><strong>The 30 simple workouts programs</strong></p>
        </header>
    )

    const footer = (
        <footer>
            <p>Built by <a target="_blank" href="https://shejulshubham.github.io/">
                Shubham Shejul</a><br />
                Styled with <a target="_blank" href="https://www.fantacss.smoljames.com/">FantsCSS
                </a></p>
        </footer>
    )

    return (
        <>
            {header}
            {children}
            {footer}
        </>
    )
}
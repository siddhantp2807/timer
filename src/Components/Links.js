import GithubLogo from "./GithubLogo";
import WebIcon from "./WebIcon";

const Links = () => {

    return (
        <div className="links">
            <div>
                <a href="https://github.com/siddhantp2807/">
                <GithubLogo fill={"#d1dede"}/>
                </a>
            </div>
            <div>
            <a href="https://siddhantp2807.github.io/">
                <WebIcon stroke={"#d1dede"}/>
            </a>
            </div>
        </div>
    )
}

export default Links;
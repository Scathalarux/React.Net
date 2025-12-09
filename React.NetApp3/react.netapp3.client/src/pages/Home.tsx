import AuthorizeView from '../components/AuthorizeView';
import { LogoutLink } from '../components/LogoutLink';
import { WeatherForecast } from '../components/WeatherForecast';

export function Home() {
    return (<div className="flex flex-col justify-center items-center m-10">
        <AuthorizeView>
            <span><LogoutLink>Logout </LogoutLink></span>
            <WeatherForecast />
        </AuthorizeView>
    </div>);
}
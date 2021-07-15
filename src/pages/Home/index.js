import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import Icaro from '../../assets/Icaro.svg'
import CamaraLogo from '../../assets/camara_logo.svg'
import UfpbLogo from '../../assets/ufpb_logo.svg'
import LavidLogo from '../../assets/lavid_logo.svg'
import RnpLogo from '../../assets/rnp_logo.svg'
import MinisterioLogo from '../../assets/ministerio_logo.svg'
import Icon from '../../assets/icon.svg'
import Insta from '../../assets/insta.svg'
import Facebook from '../../assets/facebook.svg'
import Youtube from '../../assets/youtube.svg'
import Music_Icon from '../../assets/music_icon.svg'
import Music_Icons from '../../assets/music_icons.svg'
import IconBody from '../../assets/icon_body.svg'
import IcaroCirculo from '../../assets/Icaro_circulo.svg'
import IconGreen from '../../assets/icon_green.svg'
import NotebookImg from '../../assets/notebook.svg'
import Button from '../../components/Button'

const Home = () => {
	return (
		<div id="background">
			<div id="page-home">
				<header>
					<div className="libraske-header">LIBRASKÊ</div>
					<div className="options">
						<a href="http://www.google.com">O PROJETO</a>
						<a href="https://www.gov.br/governodigital/pt-br/vlibras">VLIBRAS</a>
					</div>
				</header>
				<div className="main-content">
					<div className="main">
						<span className="suite">Um produto educacional da
							<b> Suíte Vlibras</b>
						</span>
						<div className="init-container">
							<img className="icaro" src={Icaro} alt="Icaro" />
							<div>
								<span className="title">LIBRASKÊ</span>
								<span className="subtitle">Karaokê em Libras</span>
								<Link to="/access" style={{ textDecoration: 'none' }}>
									<Button text="Acessar" type="acessar" />
								</Link>
							</div>
						</div>
					</div>
					<div className="realizadores">
						<span>Realizadores</span>
						<div className="logos_realizadores_container">
							<img src={MinisterioLogo} alt="Logo Ministério da Economia" />
							<div>
								<img src={CamaraLogo} alt="Logo Câmara dos Deputados" />
								<img src={LavidLogo} alt="Logo Lavid" />
							</div>
							<div>
								<img src={UfpbLogo} alt="Logo Ufpb" />
								<img src={RnpLogo} alt="Logo RNP" />
							</div>
						</div>
					</div>
					<div className="projeto">
						<div className="sobre">
							<div>
								<img src={Music_Icon} alt="Icone Música" />
								O PROJETO
							</div>
							<p>
								O Libraskê é um jogo da suíte Vlibras criado para aproximar as pessoas da Língua Brasileira de Sinais (Libras) através da música.
							</p>
						</div>
						<div>
							<img src={Icaro} alt="Icaro" />
							<img src={Music_Icons} alt="Ícones de música" />
						</div>
					</div>
					<div className="funciona">
						<div className="funciona_titulo">COMO FUNCIONA?</div>

						<div className="icons_container">
							<div>
								<img src={IcaroCirculo} alt="Icone Ícaro" />
								O avatar vai apresentar os sinais da música.
							</div>
							<div>
								<img src={IconBody} alt="Avatar Vlibras" />
								Você deve observar e repetir as expressões faciais
								e os movimentos corporais de cada sinal.
							</div>
						</div>
					</div>
					<div className="vlibras">
						<div className="sobre">
							<div>
								<img src={IconGreen} alt="Icone Vlibras" />
								VLIBRAS
							</div>
							<div className="sobre_container">
								<p>
									O VLibras é um conjunto de ferramentas gratuitas
									e de código aberto que traduz conteúdos digitais
									em Português para Libras, tornando computadores,
									celulares e plataformas Web mais acessíveis para
									as pessoas surdas.
								</p>
								<img src={NotebookImg} alt="Imagem Dispositivos com Vlibras" />
							</div>
							<div className="sobre_container">
								<img src={Icaro} alt="Icaro" />
								<p>
									O Vlibras é o resultado de uma parceria entre
									o Ministério da Economia (ME), por meio da
									Secretaria de Governo Digital (SGD), e a
									Universidade Federal da Paraíba (UFPB),
									através do Laboratório de Aplicações de
									Vídeo Digital (LAVID).
								</p>
							</div>
						</div>
					</div>
				</div>
				<footer>
					<div className="direitos">
						<img src={Icon} alt="Logo" />
						2020 Vlibras
					</div>
					<div className="social">
						<a href="https://www.instagram.com/vlibrasoficial/" target="_blank" rel="noreferrer"><img src={Insta} alt="Logo Instagram" /></a>
						<a href="https://www.facebook.com/vlibras" target="_blank" rel="noreferrer"><img src={Facebook} alt="Logo Facebook" /></a>
						<a href="https://www.youtube.com/channel/UCF94lq7TwAu5OmlwIu44qpA" target="_blank" rel="noreferrer"><img src={Youtube} alt="Logo Youtube" /></a>
					</div>
				</footer >
			</div >
		</div>
	)
}

export default Home
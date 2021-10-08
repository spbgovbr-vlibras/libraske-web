import React from 'react'
import './styles.css'

import GovIcon from '../../assets/gov_icon.svg'
import GuestIcon from '../../assets/guest_icon.svg'
import Voltar from '../../assets/voltar.svg'

/**
 * Componente de botão genérico.
 * @param {string} text texto que será exibido no botão.
 * @param {img} icon ícone que será exibido no botão.
 * @param {string} type tipo de botão que será renderizado.
 */
const Button = ({ text, icon, type }) => {

	if (icon === "GovIcon") icon = GovIcon
	if (icon === "GuestIcon") icon = GuestIcon

	return (
		<div className="buttons">
			{
				icon &&
				(
					<button className="button_icons">
						< img src={icon} alt="Icone" />
						{text}
					</button >
				)
			} {
				type === "acessar" &&
				<button className="normal">
					{text}
				</button >
			}{
				type === "entrar" &&
				< button className="entrar">
					{text}
				</button >
			}{
				type === "voltar" &&
				< button className="voltar">
					< img src={Voltar} alt="Icone de Voltar" />
					<div>{text}</div>
				</button >
			}
		</div >
	)
}

export default Button
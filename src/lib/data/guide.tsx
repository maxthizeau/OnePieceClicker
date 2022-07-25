/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */

import Trans from "next-translate/Trans"

const ImageContainer = ({ src }: { src: string }) => {
  return (
    <div className="image-container">
      <img src={src} />
    </div>
  )
}

export const guideSteps = [
  {
    title: "zone",
    content: (
      <Trans i18nKey="tutorial:Guide.zone-content" components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/zone.jpg" />]} />
    ),
  },
  {
    title: "click-power",
    content: (
      <Trans
        i18nKey="tutorial:Guide.click-power-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/click-power.jpg" />]}
      />
    ),
  },
  {
    title: "crew-power",
    content: (
      <Trans
        i18nKey="tutorial:Guide.crew-power-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/crew-power.jpg" />]}
      />
    ),
  },
  {
    title: "fight",
    content: (
      <Trans i18nKey="tutorial:Guide.fight-content" components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/fight.jpg" />]} />
    ),
  },
  {
    title: "vivre-cards",
    content: (
      <Trans
        i18nKey="tutorial:Guide.vivre-cards-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/vivre-cards.jpg" />]}
      />
    ),
  },
  {
    title: "hp",
    content: (
      <Trans
        i18nKey="tutorial:Guide.hp-content"
        components={[
          <div />,
          <p />,
          <b />,
          <u />,
          <i />,
          <ImageContainer src="images/tutorial/hp.jpg" />,
          <ImageContainer src="images/tutorial/heal-food.jpg" />,
        ]}
      />
    ),
  },
  {
    title: "dungeon",
    content: (
      <Trans
        i18nKey="tutorial:Guide.dungeon-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/dungeon.jpg" />]}
      />
    ),
  },
  {
    title: "map",
    content: (
      <Trans i18nKey="tutorial:Guide.map-content" components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/map-button.jpg" />]} />
    ),
  },
  {
    title: "ship",
    content: (
      <Trans
        i18nKey="tutorial:Guide.ship-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/ship-button.jpg" />]}
      />
    ),
  },
  {
    title: "fleet",
    content: (
      <Trans
        i18nKey="tutorial:Guide.fleet-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/fleet-button.jpg" />]}
      />
    ),
  },
  {
    title: "shop",
    content: (
      <Trans
        i18nKey="tutorial:Guide.shop-content"
        components={[<div />, <p />, <b />, <u />, <i />, <ImageContainer src="images/tutorial/shop-button.jpg" />]}
      />
    ),
  },
]

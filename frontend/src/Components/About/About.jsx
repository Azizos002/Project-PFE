import React from 'react';
import { Container, Card, CardContent, Typography, List, ListItem } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <Container className="about-container">
      <Typography variant="h4" gutterBottom>
        À Propos de Smart Money Management
      </Typography>

      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Bienvenue sur notre page "À Propos" !
          </Typography>
          <Typography variant="body1">
            Ici, nous vous présenterons notre application web intelligente de gestion financière, notre équipe dévouée, ainsi que notre vision et notre mission.
          </Typography>
        </CardContent>
      </Card>

      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Notre Mission
          </Typography>
          <Typography variant="body1">
            Nous sommes déterminés à aider les individus et les familles à reprendre le contrôle de leurs finances grâce à notre application web intuitive et facile à utiliser. Notre objectif principal est de vous offrir une plateforme sécurisée et sans faille pour gérer vos dépenses, établir des budgets et atteindre vos objectifs financiers.
          </Typography>
        </CardContent>
      </Card>

      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Notre Équipe
          </Typography>
          <Typography variant="body1">
            Notre équipe est composée de professionnels hautement qualifiés dans les domaines du développement web, de la finance et du design de l'expérience utilisateur. Ensemble, nous nous efforçons de créer une application de gestion financière intelligente qui non seulement fonctionne parfaitement, mais qui est également conviviale et accessible à tous.
          </Typography>
        </CardContent>
      </Card>

      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Nos Produits
          </Typography>
          <List>
            {[
              'Suivi et Catégorisation des Dépenses',
              'Outils de Budget et Alertes',
              'Gestion de la Dette et Planification de Remboursement',
              'Suivi et Analyse des Investissements',
              'Stockage de Données Sécurisé et Crypté',
            ].map((item, index) => (
              <ListItem key={index}>
                <Typography variant="body1">{item}</Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant="body1">
            Flexibilité et Personnalisation : Notre application est conçue pour être flexible et personnalisable, vous permettant d'adapter votre expérience selon vos besoins et vos objectifs financiers spécifiques.
          </Typography>
        </CardContent>
      </Card>

      <Card className="card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            En Savoir Plus
          </Typography>
          <Typography variant="body1">
            Si vous souhaitez en savoir plus sur notre application de gestion financière intelligente, n'hésitez pas à explorer notre site web ou à nous contacter directement. Nous serions ravis de répondre à vos questions et de vous aider à démarrer votre voyage vers une meilleure gestion financière.
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="subtitle2" align="right" className="delivery-date">
        Date de Livraison Prévue: 31 Mai
      </Typography>
    </Container>
  );
}

export default About;

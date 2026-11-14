# Wolof — page de connexion : brouillons à relire

Ces 59 textes wolof s'affichent sur la page de connexion quand on choisit « Wolof ». Ce sont des **brouillons**
rédigés sans relecture par une personne locutrice (exception décidée le 12/11/2026 ; la règle du projet reste :
pas de wolof non relu). Ils vivent dans `web-angular/src/lib/i18n/wo.ts` (`BROUILLONS_A_RELIRE`).

**Pour la personne qui relit :** corriger la colonne « Wolof proposé » (garder les `{paramètres}` tels quels),
puis noter « OK » ou la correction dans « Relu ». Une clé relue passe ensuite dans `RELUES` et `REVIEWED_WO`.

Le nom officiel du CRADESC reste en français (nom propre). « e-mail », « logo » et les unités (s, min) sont gardés.

| Clé | Français | Wolof proposé | Relu |
|---|---|---|---|
| `auth.layout.headline` | Recensez, cartographiez et suivez vos producteurs, même sans réseau. | Bindal, rëddal ci kaart te toppal say beykat, doonte rezo amul. | |
| `auth.layout.lead` | Une communauté, des coopératives, un avenir commun. | Benn mbooloo, ay koperatiif, benn ëllëg. | |
| `auth.login.title` | Connexion | Duggu | |
| `auth.login.description` | Accédez à votre espace avec votre adresse e-mail. Un code de vérification vous sera envoyé. | Duggal ci sa bérab ak sa adaras e-mail. Dinañu la yónne ab kood ngir wóoral. | |
| `auth.login.email` | Adresse e-mail | Adaras e-mail | |
| `auth.login.emailPlaceholder` | prenom.nom@organisation.sn | prenom.nom@organisation.sn | |
| `auth.login.password` | Mot de passe | Baatu jàll | |
| `auth.login.passwordPlaceholder` | Votre mot de passe | Sa baatu jàll | |
| `auth.login.forgot` | Mot de passe oublié | Fàtte nga sa baatu jàll? | |
| `auth.login.submit` | Se connecter | Duggu | |
| `auth.login.submitting` | Connexion en cours | Duggu gi mi ngi dem | |
| `auth.login.errorEmail` | Saisissez une adresse e-mail valide. | Bindal adaras e-mail bu baax. | |
| `auth.login.errorPassword` | Saisissez votre mot de passe. | Bindal sa baatu jàll. | |
| `auth.login.footer` | La session expire automatiquement après 30 minutes. | Sa duggu dina jeex boppam ginnaaw 30 minit. | |
| `auth.step.credentials` | Identifiants | Say xibaar | |
| `auth.step.code` | Vérification | Wóoral | |
| `auth.step.progress` | Étape {current} / {total} | Tappe {current} / {total} | |
| `auth.otp.title` | Vérification en deux étapes | Wóoral ci ñaari tappe | |
| `auth.otp.sent` | Un code à {length} chiffres a été envoyé à {email}. Il est valable {minutes} minutes. | Yónne nañu ab kood bu am {length} siifar ci {email}. Dina baax {minutes} minit. | |
| `auth.otp.code` | Code de vérification | Kood bu wóoral | |
| `auth.otp.errorLength` | Saisissez les {length} chiffres du code. | Bindal {length} siifar yu kood bi. | |
| `auth.otp.submit` | Vérifier et se connecter | Wóoral te duggu | |
| `auth.otp.verifying` | Vérification en cours | Wóoral gi mi ngi dem | |
| `auth.otp.resend` | Renvoyer le code | Yónneewaat kood bi | |
| `auth.otp.resendIn` | Renvoyer le code dans {seconds} s | Yónneewaat kood bi ci {seconds} s | |
| `auth.otp.resent` | Un nouveau code vient d'être envoyé. | Yónne nañu ab kood bu bees. | |
| `auth.otp.back` | Changer d'adresse | Soppi adaras | |
| `auth.mail.title` | Courriel simulé | Bataaxal bu ñu roy | |
| `auth.mail.line` | En production, ce code est envoyé à {to}. | Bu dee ci dëgg-dëgg, dinañu yónne kood bii ci {to}. | |
| `auth.mail.code` | Code reçu : | Kood bi ñu jot : | |
| `auth.mail.invitationTitle` | Invitation simulée | Woote bu ñu roy | |
| `auth.mail.invitationLine` | En production, ce lien est envoyé à {to}. | Bu dee ci dëgg-dëgg, dinañu yónne lien bii ci {to}. | |
| `auth.mail.invitationOpen` | Ouvrir le lien d'invitation de {name} | Ubbil lien woote bu {name} | |
| `auth.password.show` | Afficher | Wone | |
| `auth.password.hide` | Masquer | Nëbb | |
| `auth.snack.close` | Fermer le message | Tëj bataaxal bi | |
| `auth.help.title` | Besoin d'aide pour vous connecter ? | Soxla nga ndimbal ngir duggu? | |
| `auth.cradesc.carriedBy` | Porté par | Ci njiitu | |
| `auth.cradesc.fullName` | Centre de Recherche et d'Action sur les Droits Économiques, Sociaux et Culturels | (nom officiel, gardé en français) | |
| `auth.cradesc.logoAlt` | Logo du CRADESC | Logo CRADESC | |
| `auth.cradesc.visit` | Visiter le site du CRADESC (nouvel onglet) | Seet situ CRADESC (palanteer bu bees) | |
| `auth.error.invalid_credentials` | Adresse e-mail ou mot de passe incorrect. | Adaras e-mail bi walla baatu jàll bi baaxul. | |
| `auth.error.locked` | Trop de tentatives. L'accès est suspendu temporairement. | Jéem yi bari nañu lool. Duggu gi tëju na ab diir. | |
| `auth.error.otp_invalid` | Code incorrect. | Kood bi baaxul. | |
| `auth.error.otp_expired` | Ce code a expiré. Demandez-en un nouveau. | Kood bii jeex na. Laajal bu bees. | |
| `auth.error.otp_attempts` | Trop d'essais. Recommencez la connexion pour recevoir un nouveau code. | Jéem yi bari nañu lool. Tàmbaliwaatal duggu gi ngir jot kood bu bees. | |
| `auth.error.rate_limited` | Trop de demandes. Patientez avant de réessayer. | Laaj yi bari nañu lool. Muñal ba noppi jéemaat. | |
| `auth.error.weak_password` | Ce mot de passe ne respecte pas toutes les règles. | Baatu jàll bii toppul sàrt yépp. | |
| `auth.error.reset_expired` | Cette demande a expiré. Recommencez depuis le début. | Laaj bii jeex na. Tàmbaliwaatal ci njëlbéen. | |
| `auth.error.invitation_invalid` | Ce lien d'invitation n'est plus valable. Demandez-en un nouveau à votre administrateur. | Lien woote bii amatul solo. Laajal benn bu bees ci sa njiit. | |
| `auth.error.unavailable` | Le service d'authentification n'est pas disponible. Contactez l'administrateur. | Sarwiisu duggu gi liggéeyul léegi. Jokkool ak njiit li. | |
| `auth.error.fallback` | Une erreur est survenue. Réessayez dans un instant. | Am na njuumte. Jéemaatal ci kanam tuuti. | |
| `auth.error.retryIn` | Réessayez dans {wait}. | Jéemaatal ci {wait}. | |
| `auth.error.attemptsLeft.un` | {count} essai restant. | {count} jéem bu des. | |
| `auth.error.attemptsLeft.autre` | {count} essais restants. | {count} jéem yu des. | |
| `auth.wait.seconds` | {n} s | {n} s | |
| `auth.wait.minutes` | {n} min | {n} min | |
| `brand.logoAlt` | Logo Mbay Diaay | Logo Mbay Diaay | |
| `ui.slideshow.goTo` | Afficher la photo {current} sur {total} | Wone nataal {current} ci {total} | |

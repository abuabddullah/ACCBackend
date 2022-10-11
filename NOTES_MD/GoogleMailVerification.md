## Enabling Google OAuth

> > visit: [google Cloud website](https://cloud.google.com/)
>
> > press [console](https://console.cloud.google.com/welcome?project=myassignment-10-347517&_ga=2.4975475.1125321870.1665409389-370260763.1665409389) from the navbar
>
> > press **drop-down** beside the running project name and [create a new project](https://console.cloud.google.com/projectcreate?previousPage=%2Fwelcome%3Fproject%3Dmyassignment-10-347517%26_ga%3D2.243830341.1125321870.1665409389-370260763.1665409389&organizationId=0)
> >
> > > only 12 projects can be made
> >
> > > no need to put **organization** name
> >
> > > click **_create_**
>
> > now again press **drop-down** beside the running project name and **select the required project**
>
> > now from the right side bar select **APIs & Services** > [**OAuth consent screen**](https://console.cloud.google.com/apis/credentials/consent?project=myassignment-10-347517)
>
> > click [**creat**](https://console.cloud.google.com/apis/credentials/consent/edit;newAppInternalUser=false?project=accbackend) for app creation
> >
> > > in **App Information**
> > >
> > > > give **App Name**
> > >
> > > > give **User support email** : your logged in email
> > >
> > > > don't touch **App Logo**
> >
> > > directly go to **Developer contact information**
> > >
> > > > give **Email addresses** : your logged in email
> >
> > > click **Save and Continue**
>
> > now we are in next steps of **Auth Conscent Screen** which is **_Scopes_**
> >
> > > here nothing to do just click **Save and Continue**
>
> > now we are in next steps of **Auth Conscent Screen** which is **_Test Users_**
> >
> > > click **Add Users**
> > >
> > > > give your logged in email and click **Add**
> > >
> > > > click **Save and Continue**
>
> > now we are in next steps of **Auth Conscent Screen** which is **_Summary_**
> >
> > > here nothing to do just click **Back To Dashboard**
> > >
> > > > now make the app **publish public**
>
> > now from the right side bar select [**Credentials**](https://console.cloud.google.com/apis/credentials?project=accbackend)
>
> > from the nav bar select **Create Credentials** > [**OAuth Client ID**](sd564fsdf4ds56)
> >
> > > select **Application Type** : Web Application
> >
> > > give a name **"ACCBackend"** or any random
> >
> > > go to **Authorized redirect URIs**
> > >
> > > > here just paste this google playgroud url of bellow : https://developers.google.com/oauthplayground
> > > >
> > > > > must not put any **/** at the last of this link
> > >
> > > > click **"Create"** it will redirct us to [**Credentials**](https://console.cloud.google.com/apis/credentials?project=accbackend) page again
>
> > from **OAuth 2.0 Client IDs** hover on and select the recently created app (for us which is **"ACCBackend"**)
> >
> > > there we will have **Client Id** and **Client Secret** copy them
> > >
> > > > if not showing then refresh the page
>
> > now open a new window and go to [google Playground](https://developers.google.com/oauthplayground)
> >
> > > Step 1 : Select & authorize APIs
> > >
> > > > click on the **settings gear** icon
> > > >
> > > > > put **tik** in the checkBox of **Use your own OAuth credentials**
> > > > >
> > > > > > paste your previously copied **Client Id** and **Client Secret** in the input field
> > > > >
> > > > > > close the **gear** no need to save
> > >
> > > > put **Input Your Own Scopes** : https://mail.google.com/
> > > >
> > > > > now need to confirm login
> > > > >
> > > > > > select the account using for google playground
> > > > >
> > > > > > **Google hasn’t verified this app**-alert will show click **Advanced** at bottom-left
> > > > > >
> > > > > > > click **Go to ACCBackend (unsafe)** at bottom-left
> > > > > >
> > > > > > > **ACCBackend wants additional access to your Google Account**-alert will show click **Continue**
> >
> > > Step 2 :Exchange authorization code for tokens
> > >
> > > > click **Exchange authorization code for tokens** blue button
> > >
> > > > copy the **Refresh token**

CLIENT_ID, CLIENT_SECRET, google playground এর REFRESH_TOKEN, SENDER_MAIL অবশ্যই **.env** file এ রেখে দিতে হবে

## conninting project with google mail service

> > install **_nodemailer_** and **_googleapis_** in our project dependencies
>
> > dfgfg

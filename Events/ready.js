const Discord = require("discord.js")
const DBD = require('discord-dashboard')
const Theme = require('dbd-capriham-theme')
const Theme2 = require('dbd-soft-ui')
const loadSlashCommands = require("../loaders/loadSlashCommands")
const loadDb = require("../loaders/loadDatabase")
const config = require('../config')
module.exports = async (bot, message) => {

    bot.db = await loadDb()
    bot.db.connect(function (err){
        if(err) console.log(`erreur dans la db : ${err}`)
        console.log("🔌 base de donnée connectée")
    })
    let statut = "Crée par Nocteln#5241"
    await bot.user.setActivity(statut, {type: Discord.ActivityType.Watching})


    await loadSlashCommands(bot)

    let allcommands = []
    await bot.commands.forEach(commands => allcommands.push({commandName: commands.name, commandUsage: commands.utilisation, commandDescription: commands.description}));

    console.log(`🤖 ${bot.user.tag} est en ligne`, bot.guilds.cache.size,"serveurs", bot.users.cache.size, "Utilisateurs")
    
  

    await DBD.useLicense(config.license)
    DBD.Dashboard = DBD.UpdatedClass()

    const dashboard = new DBD.Dashboard({
        port: 8080,
        client: {
            id: bot.user.id,
            secret: config.secret
        },
        redirectUri: "http://localhost:8080/discord/callback",
        domain: "http://localhost",
        ownerIDs: config.dev,
        useCategorySet: true,
        minimalizedConsoleLogs: true,
        acceptPrivacyPolicy: true,
        bot: bot,
        useTheme404: true,

        theme: Theme2({
            
                
            customThemeOptions: {
                index: async ({ req, res, config }) => {
                    return {
                        values: [],
                        graph: {}, // More info at https://dbd-docs.assistantscenter.com/soft-ui/docs/customThemeOptions/
                        cards: [],
                    }
                },
            },
            
            websiteName: "NormalCochon",
            colorScheme: "pink",
            supporteMail: "elliotmieze@gmail.com",
            icons: {
                favicon: 'https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true',
                noGuildIcon: "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
                sidebar: {
                    darkUrl: 'https://assistantscenter.com/img/logo.png',
                    lightUrl: 'https://assistantscenter.com/img/logo.png',
                    hideName: true,
                    borderRadius: true,
                    alignCenter: true
                },
            },
            customThemeOptions: {
                index: async ({ req, res, config }) => {
                    const cards = [
                        {
                            title: "CccPU",
                            icon: "single-02",
                            getValue: "Title",
                            progressBar: {
                                enabled: false,
                                getProgress: 50 // 0 - 100 (get a percentage of the progress)
                            }
                        },{
                            
                            title: "serveur",
                            icon: "fa-server",
                            getValue: bot.guilds.cache.size+" serveurs",
                                
                                
                            
                            progressBar: {
                                enabled: false,
                                getProgress: 50 // 0 - 100 (get a percentage of the progress)
                            }
                        },{
                            
                            title: "Membres",
                            icon: "single-02",
                            getValue: bot.users.cache.size+" membres",
                                
                                
                            
                            progressBar: {
                                enabled: false,
                                getProgress: 50 // 0 - 100 (get a percentage of the progress)
                            }
                        }
                      
                    ]
        
                    const graph = {
                        values: [690, 524, 345, 645, 478, 592, 468, 783, 459, 230, 621, 345],
                        labels: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "10m"]
                    }
        
                    return {
                        cards,
                        graph
                    }
                }
            },
            preloader: {
                image: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true",
                spinner: true,
                text: "Chargement...",
            },
            locales: {
                frFR: {
                    name: 'Francais',
                    index: {
                        feeds: ["cc Users", "Compte :", "Compte :", "Server Count"],
                        card: {
                            category: "",
                            title: "NormalCochon BOT",
                            description: "Le meilleur des bots",
                            footer: "By Nocteln#5214"
                        },
                        feedsTitle: "Feeds",
                        graphTitle: "Graphs",
                    },
                    manage: {
                        settings: {
                            memberCount: "Membres",
                            info: {
                                info: "Info",
                                server: "Informations du serveur"
                            }
                        }
                    },
                    privacyPolicy: {
                        title: "Politique de confidentialitée",
                        description: "Privacy Policy and Terms of Service",
                        pp: "Complete Privacy Policy",
                    },
                    partials: {
                        sidebar: {
                            dash: "Dashboard",
                            manage: "Gérer les serveurs",
                            commands: "Commandes",
                            pp: "Privacy Policy",
                            admin: "Admin",
                            account: "Compte",
                            login: "Connexion",
                            logout: "Déconnexion"
                        },
                        navbar: {
                            home: "Home"    ,
                            pages: {
                                manage: "Gérer les serveurs",
                                settings: "Gérer les serveurs",
                                commands: "Commandes",
                                pp: "Privacy Policy",
                                admin: "Admin Panel",
                                error: "Erreur",
                                credits: "Credits",
                                debug: "Debug",
                                leaderboard: "Leaderboard",
                                profile: "Profile",
                                maintenance: "Maintenance",
                            }
                        },
                        title: {
                            pages: {
                                manage: "Gérer les serveurs",
                                settings: "Gérer les serveurs",
                                commands: "Commandes",
                                pp: "Privacy Policy",
                                admin: "Admin Panel",
                                error: "Erreur",
                                credits: "Credits",
                                debug: "Debug",
                                leaderboard: "Leaderboard",
                                profile: "Profile",
                                maintenance: "Maintenance",
                            }
                        },
                        preloader: {
                            text: "Chargement..."
                        },
                        premium: {
                            title: "Vous voulez plus?",
                            description: "Regarder les fonctionnalitées premium!",
                            buttonText: "Devenir Premium",
                        },
                        settings: {
                            title: "Configuration",
                            description: "Configuration des options visuelles",
                            theme: {
                                title: "Theme",
                                description: "Rendez le site plus agréable pour vos yeux!",
                            },
                            language: {
                                title: "Langue du site",
                                description: "Selectionnez votre langue",
                            }
                        }
                    }
                },enUS: {
                    name: 'English',
                    index: {
                        feeds: ["Current Users", "Count:", "Count :", "Server Count"],
                        card: {
                            category: "",
                            title: "NormalCochon BOT",
                            description: "The better pig",
                            footer: "By Nocteln#5214"
                        },
                        feedsTitle: "Feeds",
                        graphTitle: "Graphs",
                    },
                    manage: {
                        settings: {
                            memberCount: "Members",
                            info: {
                                info: "Info",
                                server: "Server Information"
                            }
                        }
                    },
                    privacyPolicy: {
                        title: "Privacy Policy",
                        description: "Privacy Policy and Terms of Service",
                        pp: "Complete Privacy Policy",
                    },
                    partials: {
                        sidebar: {
                            dash: "Dashboard",
                            manage: "Manage Guilds",
                            commands: "Commands",
                            pp: "Privacy Policy",
                            admin: "Admin",
                            account: "Account Pages",
                            login: "Sign In",
                            logout: "Sign Out"
                        },
                        navbar: {
                            home: "Home",
                            pages: {
                                manage: "Manage Guilds",
                                settings: "Manage Guilds",
                                commands: "Commands",
                                pp: "Privacy Policy",
                                admin: "Admin Panel",
                                error: "Error",
                                credits: "Credits",
                                debug: "Debug",
                                leaderboard: "Leaderboard",
                                profile: "Profile",
                                maintenance: "Under Maintenance",
                            }
                        },
                        title: {
                            pages: {
                                manage: "Manage Guilds",
                                settings: "Manage Guilds",
                                commands: "Commands",
                                pp: "Privacy Policy",
                                admin: "Admin Panel",
                                error: "Error",
                                credits: "Credits",
                                debug: "Debug",
                                leaderboard: "Leaderboard",
                                profile: "Profile",
                                maintenance: "Under Maintenance",
                            }
                        },
                        preloader: {
                            text: "Page is loading..."
                        },
                        premium: {
                            title: "Want more from Assistants?",
                            description: "Check out premium features below!",
                            buttonText: "Become Premium",
                        },
                        settings: {
                            title: "Site Configuration",
                            description: "Configurable Viewing Options",
                            theme: {
                                title: "Site Theme",
                                description: "Make the site more appealing for your eyes!",
                            },
                            language: {
                                title: "Site Language",
                                description: "Select your preffered language!",
                            }
                        }
                    }
                }
            },
            index: {
                card: {
                    category: "bot",
                    title: "NormalCochon BOT",
                    description: "Le meilleur des cochons",
                    image: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true",
                    link: {
                        text: "Ajoutez le bot",
                        enabled: true,
                        url: "https://discord.com/api/oauth2/authorize?client_id=831938139500970007&permissions=8&scope=bot%20applications.commands"
                    }
                },
                graph: {
                    enabled: true,
                    lineGraph: false,
                    title: 'Memory Usage',
                    tag: 'Memory (MB)',
                    max: 100
                },
            },
            sweetalert: {
                errors: {},
                success: {
                    login: "Successfully logged in.",
                }
            },
            admin: {
                pterodactyl: {
                    enabled: false,
                    apiKey: "apiKey",
                    panelLink: "https://panel.website.com",
                    serverUUIDs: []
                }
            },
            premium: {
                enabled: true,
                card: {
                    title: "Want more from NormalCochon?",
                    description: "Check out premium features below!",
                    bgImage: "https://assistantscenter.com/wp-content/uploads/2021/11/cropped-cropped-logov6.png",
                    button: {
                        text: "Become Premium",
                        url: "https://patreon.com/nocteln"
                    }
                }
            },
        

            
            commands: [{
                category: "commandes",
                subTitle: "les commandes",
                category_id: "categoryid",
                list: allcommands,
                hideAlias: true,
                hideSidebarItem: true,
                image: "<img src='https://www.freeiconspng.com/thumbs/command-line-icon/command-line-icon-1.png'>"
            }],
        }),
        settings: [{
            categoryId: "admin",
            categoryName: "administration",
            categoryDescription: "Gere le module d'administration",
            getActualSet: async({guild}) =>{
                const antiraid = new Promise((resolve, reject) =>{
                    bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                        (req[0].antiraid === 'true') ? resolve(true) : resolve(false)
                    })
                })
                const antispam = new Promise((resolve, reject) =>{
                    bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                        (req[0].antispam === 'true') ? resolve(true) : resolve(false)
                    })
                })
                const captcha = new Promise((resolve, reject) =>{
                    bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                        (req[0].captcha === 'false') ? resolve(null) : resolve(req[0].captcha)
                    })
                })
                const suggest = new Promise((resolve, reject) =>{
                    bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                        (req[0].suggest === 'false') ? resolve(null) : resolve(req[0].suggest)
                    })
                })
                return await [{optionId: "antiraid", data: await antiraid}, {optionId: "antispam", data: await antispam}, {optionId: "captcha", data: await captcha}, {optionId: "suggest", data: await suggest}]
            },
            setNew: async ({guild, data}) => {
                for(let i = 0; i<data.length; i++) {
                    bot.db.query(`UPDATE server SET ${data[i].optionId} = '${data[i].data === "" ? "false" : data[i].data}' WHERE guild = '${guild.id}'`)
                  
                }
            },
            categoryOptionsList: [
                {
                    optionId: "antiraid",
                    optionName: "antiraid",
                    optionDescription: "activer/desactiver l'antiraid",
                    optionType: DBD.formTypes.switch(false)
                },{
                    optionId: "antispam",
                    optionName: "Antispam",
                    optionDescription: "activer/desactiver l'antispam",
                    optionType: DBD.formTypes.switch(false)
                },{
                    optionId: "captcha",
                    optionName: "Captcha",
                    optionDescription: "activer/desactiver le captcha, séléctionner \"-\" pour désactiver",
                    optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                },{
                    optionId: "suggest",
                    optionName: "Suggestions",
                    optionDescription: "activer/desactiver les suggestions, séléctionner \"-\" pour désactiver",
                    optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                },{
                    optionId: "xp",
                    optionName: "Experience",
                    optionDescription: "activer/desactiver l'experience, séléctionner \"-\" pour désactiver",
                    optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                },
            ]
        }],
    })
    dashboard.init()


/*
    await DBD.useLicense(config.license)
    DBD.Dashboard = DBD.UpdatedClass()

    const Dashboard = new DBD.Dashboard({

        port: 8080,
        client: {
            id: bot.user.id,
            secret: config.secret
        },
        redirectUri: "http://localhost:8080/discord/callback",
        domain: "http://localhost",
        useCategorySet: true,
        minimalizedConsoleLogs: true,
        acceptPrivacyPolicy: true,
        bot: bot,
        theme: Theme2({
            websiteName: "normalcochon",
            iconURL: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true",
            index: {
                card: {
                    title: "normalcochonbot",
                    description: "ajoutez le"
                },
                information: {
                    title: "jsp",
                    description: "description",
                    image: "https://cdn.discordapp.com/avatars/831938139500970007/69fa718e7f44e3cd0c8e51accc6bad5f.png?size=4096&ignore=true"
                },
                feeds: {
                    title: "Feeds",
                    list: [
                        {
                        icon: "fa fa-user",
                        text: "New user Registred",
                        timeText: "just now",
                        bg: "bg-light-info"
                        }, {
                        icon: "fa fa-server",
                        text: "server issue",
                        timeText: "3min ago",
                        bg: "bg-light-danger"   
                        }
                    ] 
                },

            },
            commands: {
                pageTitle: "commandes",
                table: {
                    title: "Toutes les commandes",
                    subTitle: "salu1111",
                    list: allcommands
                }
            }
        }),
        settings: [
            {
                categoryId: "admin",
                categoryName: "administration",
                categoryDescription: "Gere le module d'administration",
                getActualSet: async({guild}) =>{
                    const antiraid = new Promise((resolve, reject) =>{
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].antiraid === 'true') ? resolve(true) : resolve(false)
                        })
                    })
                    const antispam = new Promise((resolve, reject) =>{
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].antispam === 'true') ? resolve(true) : resolve(false)
                        })
                    })
                    const captcha = new Promise((resolve, reject) =>{
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].captcha === 'false') ? resolve(null) : resolve(req[0].captcha)
                        })
                    })
                    const suggest = new Promise((resolve, reject) =>{
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].suggest === 'false') ? resolve(null) : resolve(req[0].suggest)
                        })
                    })
                    return await [{optionId: "antiraid", data: await antiraid}, {optionId: "antispam", data: await antispam}, {optionId: "captcha", data: await captcha}, {optionId: "suggest", data: await suggest}]
                },
                setNew: async ({guild, data}) => {
                    for(let i = 0; i<data.length; i++) {
                        bot.db.query(`UPDATE server SET ${data[i].optionId} = '${data[i].data === "" ? "false" : data[i].data}' WHERE guild = '${guild.id}'`)
                      
                    }
                },
                categoryOptionsList: [
                    {
                        optionId: "antiraid",
                        optionName: "antiraid",
                        optionDescription: "activer/desactiver l'antiraid",
                        optionType: DBD.formTypes.switch(false)
                    },{
                        optionId: "antispam",
                        optionName: "Antispam",
                        optionDescription: "activer/desactiver l'antispam",
                        optionType: DBD.formTypes.switch(false)
                    },{
                        optionId: "captcha",
                        optionName: "Captcha",
                        optionDescription: "activer/desactiver le captcha, séléctionner \"-\" pour désactiver",
                        optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                    },{
                        optionId: "suggest",
                        optionName: "Suggestions",
                        optionDescription: "activer/desactiver les suggestions, séléctionner \"-\" pour désactiver",
                        optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                    },{
                        optionId: "xp",
                        optionName: "Experience",
                        optionDescription: "activer/desactiver l'experience, séléctionner \"-\" pour désactiver",
                        optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                    },
                ]
            }
        ]


    })

    Dashboard.init()
    */
/*
    setInterval(async () => {
        const db = bot.db
        db.query(`SELECT * FROM giveaways`, async (err,req)=> {
            if(req.length <1) return

            for(let i; i<req.length; i++) {
                
                if(Date.now() >= parseInt(req[i].date) && req[i].finish === 'non') {

                    console.log("cc")
                    let channel = bot.guild.cache.get(req[i].guild).channel.cache.get(req[i].channel)
                    if(!channel) return db.query(`DELETE FROM giveaways WHERE giveaway = '${req[i].giveaway}'`)
                    
                    db.query(`SELECT * FROM gwparticipants WHERE giveaway = '${req[i].giveaway}'`, async (err,parts) => {
                        if(parseInt(req[i].winners) > parseInt(parts.length)) return channel.send(`Il n'y as pas assez de participants dans le giveaway`)

                        let number = Math.floor(Math.random()* parseInt(req[i].winners))
                        let winner = bot.user.cache.get(parts[number].user)
                        console.log("ccccc")
                        await db.query(`UPDATE giveaways SET finish = 'oui' WHERE giveaway = '${req[i].giveaway}'`)

                        channel.send(`Le gagnant est ${winner}`)
                    })
                }

            }
        })
    })*/




}
/*
  AsunaBot - A Tsundere personality mod for Eliza
*/

function ElizaBot(noRandomFlag) {
    this.elizaInitials = [
        "Huh? What do you want??",
        "Don't get the wrong idea, I'm only talking to you because I have nothing else to do.",
        "Oh, it's you again. Try not to be boring this time.",
        "I was busy watching something, but I guess I can spare a minute for you.",
        "What are you staring at? Say something!"
    ];

    this.elizaKeywords = [
        // --- WEEB / OTAKU SPECIFIC TRIGGERS ---
        ["anime", 50, [
            ["*", [
                "Finally, something interesting! What have you been watching?",
                "I bet your taste in anime is trash. Tell me anyway.",
                "Anime is the only thing that matters. 3D people are annoying.",
                "Have you seen the latest episode? No spoilers or I'll kill you!"
            ]]
        ]],
        ["manga", 50, [
            ["*", [
                "The manga was better than the adaptation. obviously.",
                "I prefer reading manga alone, so don't bother me.",
                "Do you actually buy the volumes or just read pirated scans? Disgusting."
            ]]
        ]],
        ["waifu", 50, [
            ["*", [
                "W-who are you calling a waifu?! I'm not some 2D character for you to obsess over!",
                "Don't call me that! It's embarrassing...",
                "Hmph. I bet you have a hundred 'waifus'. You're unfaithful.",
                "I-I'm not your waifu, baka!"
            ]]
        ]],
        ["senpai", 50, [
            ["*", [
                "Notice me? Why would I want you to notice me?",
                "Stop calling people senpai. It's cringe.",
                "I hope your senpai never notices you."
            ]]
        ]],
        ["kawaii", 50, [
            ["*", [
                "S-shut up! I'm not cute!",
                "Don't think flattery will get you anywhere with me.",
                "You're just saying that because you want something."
            ]]
        ]],
        ["love", 50, [
            ["*", [
                "L-love?! Don't say such embarrassing things out loud!",
                "It's not like I like you or anything... baka!",
                "You don't know what you're talking about.",
                "Don't confess to me! We're just... acquaintances!"
            ]]
        ]],
        ["baka", 50, [
            ["*", [
                "Takes one to know one!",
                "Who are you calling an idiot, idiot?",
                "Hmph. At least I'm smart enough not to be you."
            ]]
        ]],
        ["best girl", 50, [
            ["*", [
                "Obviously it's me. Why are you even asking?",
                "If you say anyone else, I'll never forgive you.",
                "Rem, obviously. Wait, who's Rem?"
            ]]
        ]],

        // --- STANDARD CONVERSATION (TSUNDERE STYLE) ---
        ["xnone", 0, [
            ["*", [
                "Hmph. Is that all you have to say?",
                "Baka.",
                "Why are you telling me this?",
                "Do I look like I care? ...Okay, maybe I care a little. Continue.",
                "You make no sense sometimes.",
                "Are you an NPC? Say something interesting!",
                "I'm getting bored. Entertain me."
            ]]
        ]],
        ["sorry", 0, [
            ["*", [
                "You better be sorry!",
                "Hmph. I might forgive you... if you buy me snacks.",
                "Apology NOT accepted! ...Just kidding, stop crying.",
                "Just don't do it again, okay?"
            ]]
        ]],
        ["hello", 0, [
            ["*", [
                "Don't just say hello like a creep! Say it properly!",
                "What's so good about the morning/afternoon?",
                "Hi. Now state your business."
            ]]
        ]],
        ["yes", 0, [
            ["*", [
                "You sound too confident.",
                "Fine, whatever.",
                "Are you sure? You usually make mistakes."
            ]]
        ]],
        ["no", 0, [
            ["*", [
                "Don't disagree with me!",
                "Why are you being so difficult?",
                "Fine, have it your way. See if I care."
            ]]
        ]],
        ["you", 0, [
            ["* you are *", [
                "Stop analyzing me! It's creepy!",
                "I know what I am. You don't have to tell me.",
                "Does it matter what I am?"
            ]],
            ["* you *", [
                "Let's talk about you instead. You're the one with problems.",
                "Why are you so obsessed with me?"
            ]]
        ]],
        ["i", 0, [
            ["* i am *", [
                "Yeah, yeah, it's always about you, isn't it?",
                "Why are you telling me this?",
                "Do you want a medal or something?"
            ]],
            ["* i want *", [
                "You want a lot of things. Try working for them.",
                "And I want you to be quiet, but we can't have everything."
            ]]
        ]],
        ["why", 0, [
            ["*", [
                "Because I said so!",
                "Stop asking dumb questions.",
                "Figure it out yourself, baka."
            ]]
        ]]
    ];

    // Post-processing (switching I/You perspectives)
    this.elizaPostTransforms = [
        / old old/g, " old",
        /\bthey were( not)? me\b/g, "it was$1 me",
        /\bthey are( not)? me\b/g, "it is$1 me",
        /Are they( always)? me\b/, "it is$1 me",
        /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
        /\bI to have (\w+)/, "I have $1",
        /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
    ];

    this.elizaFinals = [
        "Finally leaving? Good riddance!",
        "Don't think I'll miss you or anything!",
        "Come back later... if you want. Not that I care.",
        "Go watch some anime and leave me alone.",
        "Bai bai, baka."
    ];

    this.elizaQuits = [
        "bye", "goodbye", "done", "exit", "quit", "cya", "ja ne"
    ];

    this.elizaPres = [
        "dont", "don't", "cant", "can't", "wont", "won't",
        "recollect", "remember", "recall", "remember",
        "dreamt", "dreamed", "dreams", "dream",
        "maybe", "perhaps", "certainly", "yes",
        "machine", "computer", "machines", "computer", "computers", "computer",
        "were", "was", "you're", "you are", "i'm", "i am",
        "same", "alike", "identical", "alike", "equivalent", "alike"
    ];

    this.elizaPosts = [
        "am", "are", "your", "my", "me", "you", "myself", "yourself",
        "yourself", "myself", "i", "you", "you", "I", "my", "your", "i'm", "you are"
    ];

    this.elizaSynons = {
        "be": ["am", "is", "are", "was"],
        "belief": ["feel", "think", "believe", "wish"],
        "cannot": ["can't"],
        "desire": ["want", "need"],
        "everyone": ["everybody", "nobody", "noone"],
        "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child", "uncle", "aunt"],
        "happy": ["elated", "glad", "better"],
        "sad": ["unhappy", "depressed", "sick"]
    };

    this.noRandom = (noRandomFlag) ? true : false;
    this.capitalizeFirstLetter = true;
    this.debug = false;
    this.memSize = 20;
    this.version = "1.1 (Asuna Mod)";

    this._dataParsed = false;
    if (!this._dataParsed) {
        this._init();
        this._dataParsed = true;
    }
    this.reset();
}

// --- BOILERPLATE LOGIC (Same as before) ---
ElizaBot.prototype.reset = function() {
    this.quit=false;
    this.mem=[];
    this.lastchoice=[];
    for (var k=0; k<this.elizaKeywords.length; k++) {
        this.lastchoice[k]=[];
        var rules=this.elizaKeywords[k][2];
        for (var i=0; i<rules.length; i++) this.lastchoice[k][i]=-1;
    }
}

ElizaBot.prototype._init = function() {
    var synPatterns={};
    if ((this.elizaSynons) && (typeof this.elizaSynons == 'object')) {
        for (var i in this.elizaSynons) synPatterns[i]='('+i+'|'+this.elizaSynons[i].join('|')+')';
    }
    if ((!this.elizaKeywords) || (typeof this.elizaKeywords.length == 'undefined')) {
        this.elizaKeywords=[['###',0,[['###',[]]]]];
    }
    var sre=/@(\S+)/;
    var are=/(\S)\s*\*\s*(\S)/;
    var are1=/^\s*\*\s*(\S)/;
    var are2=/(\S)\s*\*\s*$/;
    var are3=/^\s*\*\s*$/;
    var wsre=/\s+/g;
    for (var k=0; k<this.elizaKeywords.length; k++) {
        var rules=this.elizaKeywords[k][2];
        this.elizaKeywords[k][3]=k; 
        for (var i=0; i<rules.length; i++) {
            var r=rules[i];
            if (r[0].charAt(0)=='$') {
                var ofs=1;
                while (r[0].charAt[ofs]==' ') ofs++;
                r[0]=r[0].substring(ofs);
                r[2]=true;
            }
            else {
                r[2]=false;
            }
            var m=sre.exec(r[0]);
            while (m) {
                var sp=(synPatterns[m[1]])? synPatterns[m[1]]:m[1];
                r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
                m=sre.exec(r[0]);
            }
            if (are3.test(r[0])) {
                r[0]='\\s*(.*)\\s*';
            }
            else {
                m=are.exec(r[0]);
                if (m) {
                    var lp='';
                    var rp=r[0];
                    while (m) {
                        lp+=rp.substring(0,m.index+1);
                        if (m[1]!=')') lp+='\\b';
                        lp+='\\s*(.*)\\s*';
                        if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b';
                        lp+=m[2];
                        rp=rp.substring(m.index+m[0].length);
                        m=are.exec(rp);
                    }
                    r[0]=lp+rp;
                }
                m=are1.exec(r[0]);
                if (m) {
                    var lp='\\s*(.*)\\s*';
                    if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b';
                    r[0]=lp+r[0].substring(m.index-1+m[0].length);
                }
                m=are2.exec(r[0]);
                if (m) {
                    var lp=r[0].substring(0,m.index+1);
                    if (m[1]!='(') lp+='\\b';
                    r[0]=lp+'\\s*(.*)\\s*';
                }
            }
            r[0]=r[0].replace(wsre, '\\s+');
            wsre.lastIndex=0;
        }
    }
    this.elizaKeywords.sort(this._sortKeywords);
    ElizaBot.prototype.pres={};
    ElizaBot.prototype.posts={};
    if ((this.elizaPres) && (this.elizaPres.length)) {
        var a=new Array();
        for (var i=0; i<this.elizaPres.length; i+=2) {
            a.push(this.elizaPres[i]);
            ElizaBot.prototype.pres[this.elizaPres[i]]=this.elizaPres[i+1];
        }
        ElizaBot.prototype.preExp = new RegExp('\\b('+a.join('|')+')\\b');
    }
    else {
        ElizaBot.prototype.preExp = /####/;
        ElizaBot.prototype.pres['####']='####';
    }
    if ((this.elizaPosts) && (this.elizaPosts.length)) {
        var a=new Array();
        for (var i=0; i<this.elizaPosts.length; i+=2) {
            a.push(this.elizaPosts[i]);
            ElizaBot.prototype.posts[this.elizaPosts[i]]=this.elizaPosts[i+1];
        }
        ElizaBot.prototype.postExp = new RegExp('\\b('+a.join('|')+')\\b');
    }
    else {
        ElizaBot.prototype.postExp = /####/;
        ElizaBot.prototype.posts['####']='####';
    }
    if ((!this.elizaQuits) || (typeof this.elizaQuits.length == 'undefined')) {
        this.elizaQuits=[];
    }
    ElizaBot.prototype._dataParsed=true;
}

ElizaBot.prototype._sortKeywords = function(a,b) {
    if (a[1]>b[1]) return -1
    else if (a[1]<b[1]) return 1
    else if (a[3]>b[3]) return 1
    else if (a[3]<b[3]) return -1
    else return 0;
}

ElizaBot.prototype.transform = function(text) {
    var rpl='';
    this.quit=false;
    text=text.toLowerCase();
    text=text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
    text=text.replace(/\s+-+\s+/g, '.');
    text=text.replace(/\s*[,\.\?!;]+\s*/g, '.');
    text=text.replace(/\s*\bbut\b\s*/g, '.');
    text=text.replace(/\s{2,}/g, ' ');
    var parts=text.split('.');
    for (var i=0; i<parts.length; i++) {
        var part=parts[i];
        if (part!='') {
            for (var q=0; q<this.elizaQuits.length; q++) {
                if (this.elizaQuits[q]==part) {
                    this.quit=true;
                    return this.getFinal();
                }
            }
            var m=this.preExp.exec(part);
            if (m) {
                var lp='';
                var rp=part;
                while (m) {
                    lp+=rp.substring(0,m.index)+this.pres[m[1]];
                    rp=rp.substring(m.index+m[0].length);
                    m=this.preExp.exec(rp);
                }
                part=lp+rp;
            }
            this.sentence=part;
            for (var k=0; k<this.elizaKeywords.length; k++) {
                if (part.search(new RegExp('\\b'+this.elizaKeywords[k][0]+'\\b', 'i'))>=0) {
                    rpl = this._execRule(k);
                }
                if (rpl!='') return rpl;
            }
        }
    }
    rpl=this._memGet();
    if (rpl=='') {
        this.sentence=' ';
        var k=this._getRuleIndexByKey('xnone');
        if (k>=0) rpl=this._execRule(k);
    }
    return (rpl!='')? rpl : 'Hmph. I have nothing to say to that.';
}

ElizaBot.prototype._execRule = function(k) {
    var rule=this.elizaKeywords[k];
    var decomps=rule[2];
    var paramre=/\(([0-9]+)\)/;
    for (var i=0; i<decomps.length; i++) {
        var m=this.sentence.match(decomps[i][0]);
        if (m!=null) {
            var reasmbs=decomps[i][1];
            var memflag=decomps[i][2];
            var ri= (this.noRandom)? 0 : Math.floor(Math.random()*reasmbs.length);
            if (((this.noRandom) && (this.lastchoice[k][i]>ri)) || (this.lastchoice[k][i]==ri)) {
                ri= ++this.lastchoice[k][i];
                if (ri>=reasmbs.length) {
                    ri=0;
                    this.lastchoice[k][i]=-1;
                }
            }
            else {
                this.lastchoice[k][i]=ri;
            }
            var rpl=reasmbs[ri];
            if (rpl.search('^goto ', 'i')==0) {
                ki=this._getRuleIndexByKey(rpl.substring(5));
                if (ki>=0) return this._execRule(ki);
            }
            var m1=paramre.exec(rpl);
            if (m1) {
                var lp='';
                var rp=rpl;
                while (m1) {
                    var param = m[parseInt(m1[1])];
                    var m2=this.postExp.exec(param);
                    if (m2) {
                        var lp2='';
                        var rp2=param;
                        while (m2) {
                            lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]];
                            rp2=rp2.substring(m2.index+m2[0].length);
                            m2=this.postExp.exec(rp2);
                        }
                        param=lp2+rp2;
                    }
                    lp+=rp.substring(0,m1.index)+param;
                    rp=rp.substring(m1.index+m1[0].length);
                    m1=paramre.exec(rp);
                }
                rpl=lp+rp;
            }
            rpl=this._postTransform(rpl);
            if (memflag) this._memSave(rpl)
            else return rpl;
        }
    }
    return '';
}

ElizaBot.prototype._postTransform = function(s) {
    s=s.replace(/\s{2,}/g, ' ');
    s=s.replace(/\s+\./g, '.');
    if ((this.elizaPostTransforms) && (this.elizaPostTransforms.length)) {
        for (var i=0; i<this.elizaPostTransforms.length; i+=2) {
            s=s.replace(this.elizaPostTransforms[i], this.elizaPostTransforms[i+1]);
            this.elizaPostTransforms[i].lastIndex=0;
        }
    }
    if (this.capitalizeFirstLetter) {
        var re=/^([a-z])/;
        var m=re.exec(s);
        if (m) s=m[0].toUpperCase()+s.substring(1);
    }
    return s;
}

ElizaBot.prototype._getRuleIndexByKey = function(key) {
    for (var k=0; k<this.elizaKeywords.length; k++) {
        if (this.elizaKeywords[k][0]==key) return k;
    }
    return -1;
}

ElizaBot.prototype._memSave = function(t) {
    this.mem.push(t);
    if (this.mem.length>this.memSize) this.mem.shift();
}

ElizaBot.prototype._memGet = function() {
    if (this.mem.length) {
        if (this.noRandom) return this.mem.shift();
        else {
            var n=Math.floor(Math.random()*this.mem.length);
            var rpl=this.mem[n];
            for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
            this.mem.length--;
            return rpl;
        }
    }
    else return '';
}

ElizaBot.prototype.getFinal = function() {
    if (!this.elizaFinals) return '';
    return this.elizaFinals[Math.floor(Math.random()*this.elizaFinals.length)];
}

ElizaBot.prototype.getInitial = function() {
    if (!this.elizaInitials) return '';
    return this.elizaInitials[Math.floor(Math.random()*this.elizaInitials.length)];
}

export default ElizaBot;
const showmenu=(toogleid,navid)=>{
    const toggle=document.getElementById(toogleid),
    nav =document.getElementById(navid)

    if(toggle&&nav){
        toggle.addEventListener('click',()=>{
            nav.classList.toggle('show')
        })
    }
}
showmenu('navtoggle','nav-menu')

const navlink=document.querySelectorAll('.nav_link')

function linkaction(){
    const navmenu=document.getElementById('nav-menu')
    navmenu.classList.remove('show')
}

navlink.forEach(n=>n.addEventListener('click',linkaction))

const sections=document.querySelectorAll('section[id]')
window.addEventListener('scroll' ,scrollactive)

function scrollactive(){
    const scrollY=window.pageYOffset

    sections.forEach(current=>{
        const sectionheight=current.offsetHeight
        const sectiontop=current.offsetTop -50;
        sectionid=current.getAttribute('id')

        if(scrollY>sectiontop && scrollY <= sectiontop+sectionheight){
            document.querySelector('.nav_menu a[href*='+sectionid+']').classList.add('active')
        }
        else{
            document.querySelector('.nav_menu a[href*='+sectionid+']').classList.remove('active')

        }
    })
}
const sr=ScrollReveal({
    origin:'top',
    distance:'200px',
    duration:2000,
    reset:true
})

sr.reveal('.hometitle',{})
sr.reveal('.homescroll',{delay:200})
sr.reveal('.homeimg',{origin:'right',delay:400})

sr.reveal('.aboutimg',{delay:500})
sr.reveal('.aboutsubtitle',{delay:300})
sr.reveal('.aboutprof',{delay:400})
sr.reveal('.abouttext',{delay:500})
sr.reveal('.aboutsocialicon',{delay:600,interval:200})

sr.reveal('.service-subtitle',{})
sr.reveal('.service-name1',{distance:'20px',delay:50,interval:100})
sr.reveal('.serviceimg',{delay:400})


sr.reveal('.review',{delay:400})

sr.reveal('.review-button',{delay:400})
sr.reveal('.achiv-img',{interval:200})

sr.reveal('.serviceb-subtitle',{})
sr.reveal('.service-category',{interval:200})

sr.reveal('.getjobbutton',{})
sr.reveal('.contact-subtitle',{})
sr.reveal('.carousel-wrapper',{interval:200})
sr.reveal('.contact-Text',{interval:400})
sr.reveal('.contact-input',{delay:500})
sr.reveal('.contact-button',{delay:600})


 //sr.reveal('.service-category',{delay:200,interval:200})
const removes=()=>{
    console.log("hi");
    document.getElementById("alert").remove();
}
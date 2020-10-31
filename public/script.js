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
        const sectiontop=current.offsetTop -500;
        sectionid=current.getAttribute('id')

        if(scrollY>sectiontop && scrollY <= sectiontop+sectionheight){
            document.querySelector('.nav_menu a[href*='+sectionid+']').classList.add('active')
        }
        else{
            document.querySelector('.nav_menu a[href*='+sectionid+']').classList.remove('active')

        }
    })
}
const  datew=(str)=>{
    
   var res= str.split(" ");
    

    var month = new Array();
month["January"] = 'Jan';
month["February"] = "Feb";
month["March"] = "Mar";
month["April"] = "Apr";
month["May"] = "May";
month["June"] = "Jun";
month["July"] = "Jly";
month["August"] = "Aug";
month["September"] = "Sep";
month["October"] = "Oct";
month["November"] = "Nov";
month["December"] = "Dec";
var month = month[res[0]];
var year=res[1];
var n = year+' '+month;
return n;
}


export default class PageLoader{
    static viewPreloader(){
        document.getElementById('progress').style['display'] = 'block';
    }

    static removePreloader(){
        document.getElementById('progress').style['display'] = 'none';
    }
}
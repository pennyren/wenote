
Handlebars.templates = Handlebars.templates || {};
Handlebars.partials =  Handlebars.templates;    
function render(templateName, data) {
    var tmpl = Handlebars.templates[templateName];
    if (!tmpl) {
        var html = $("#" + templateName).html();
        if (!html) {
            throw "Not template found in pre-compiled and in DOM for " + templateName;
        }
        tmpl = Handlebars.compile(html);
        Handlebars.templates[templateName] = tmpl;
    }
    return tmpl(data);
}
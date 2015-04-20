require "extensions/views"

activate :views
activate :directory_indexes

set :relative_links, true
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'
set :layout, 'layouts/application'

configure :development do
 activate :livereload
end

configure :build do
  # Relative assets needed to deploy to Github Pages
  activate :relative_assets
end

case ENV['TARGET'].to_s.downcase
when 'production'
  activate :deploy do |deploy|
    deploy.build_before = true
    deploy.method = :rsync
    deploy.user = 'propulsion'
    deploy.host = 'propulsion.co'
    deploy.path = '/var/www/static.propulsion.co/httpdocs'
    deploy.clean = true
    deploy.port = 22
  end
else
  activate :deploy do |deploy|
    deploy.build_before = true
    deploy.method = :git
  end
end

sprockets.import_asset 'html5shiv'
sprockets.import_asset 'respond.min'

helpers do
  def nav_link(link_text, page_url, options = {})
    options[:class] ||= ""
    if current_page.url.length > 1
      current_url = current_page.url.chop
    else
      current_url = current_page.url
    end
    options[:class] << " active" if page_url == current_url
    link_to(link_text, page_url, options)
  end
end

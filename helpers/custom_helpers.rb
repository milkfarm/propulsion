module CustomHelpers
  def page_title(part, options = {})
    options = { join_with: ' | ' }.merge(options)
    parts = [data.config.company_name]
    parts << part
    parts.compact.reverse.join(options[:join_with])
  end
end

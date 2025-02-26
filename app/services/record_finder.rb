module RecordFinder
  def record_finder(model, field, value)
    model.find_by(field.to_sym => value) || raise(ActiveRecord::RecordNotFound, "#{model.name} not found")
  end
end

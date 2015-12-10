class ActionController::Parameters
  def allow_empty_arrays(*keys)
    keys.each do |key|
      if self.has_key?(key) && self[key].nil?
        self[key] = []
      end
    end
    self
  end

  def allow_empty_require(key)
    value = self[key]
    if !value.nil? || value == false
      value
    else
      raise ParameterMissing.new(key)
    end
  end
end

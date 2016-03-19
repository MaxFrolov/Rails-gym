require 'net/http'

class URLChecker

  def initialize(url, options = {})
    @url = url

    @redirect_limit = options[:redirect_limit] || 0
    @responses = []
    @allow_redirect = options[:allow_redirect]
  end

  def response_success?
    return false if @url.blank?

    fetch

    last_response.is_a? Net::HTTPSuccess
  end

  def fetch
    fetch_url @url
  end

  def last_response
    @responses.last
  end

  def self.accessible?(url, allow_redirect = true)
    new(url, { allow_redirect: allow_redirect, redirect_limit: 5 }).response_success?
  end

  def self.url_or_next_location(url)
    resource = new(url)

    resource.response_success? ? url : resource.last_response['location']
  end

  private

  def fetch_url(url)
    uri = URI.parse(url)

    @responses << Net::HTTP.start(uri.host) { |http| http.request_head uri.path }

    if last_response.is_a?(Net::HTTPRedirection) && @responses.length < @redirect_limit
      fetch_url(last_response['location'])
    end
  end
end

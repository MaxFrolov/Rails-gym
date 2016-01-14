module OAuth
  class Facebook < OAuth::Base
    def initialize(params)
      host = 'https://graph.facebook.com'
      fields = %w{id first_name last_name picture bio birthday education
                  email gender hometown link location work locale friends}

      @access_token_url = host + '/oauth/access_token'
      @data_url = "#{host}/me?fields=#{fields.join(',')}"

      super(params)
    end

    protected

    def parse_response_token(body)
      Rack::Utils.parse_query(body)['access_token']
    end
  end
end

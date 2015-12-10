module OAuth
  class Base
    attr_reader :provider, :access_token_url, :data_url, :access_token

    def initialize(params)
      @provider = self.class.name.split('::').last.downcase

      @params = {
          code: params[:code],
          redirect_uri: params[:redirectUri],
          client_id: params[:clientId],
          client_secret: ENV["#{@provider.upcase}_APP_SECRET"]
      }

      @client = HTTPClient.new
      @access_token = params[:access_token].presence || get_access_token
    end

    def get_access_token
      response = @client.post(access_token_url, @params.merge(grant_type: 'authorization_code'))

      parse_response_token(response.body)
    end

    def get_data
      response = @client.get(data_url, access_token: @access_token)

      parse_json(response.body)
    end

    protected

    def parse_json(json)
      JSON.parse(json)
    end

    def parse_response_token(body)
      parse_json(body)['access_token']
    end
  end
end

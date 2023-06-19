class ApplicationController < ActionController::API
  # include headers
  include ActionController::HttpAuthentication::Token::ControllerMethods
end

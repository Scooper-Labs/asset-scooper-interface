export interface CurrentDevicesProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: any;
  agent?: string;
  ip: string;
  location: string;
  type: string;
  device_token: any;
}

export interface InitialStateProps {
  id: string | null;
  app_jwt: string;
  email: string | null;
  is_loading: boolean;
  error: boolean;
  error_msg: string | null;
  login_response: string | null;
  upload_profile_pic_loading: boolean;
  update_fullname_loading: boolean;
  update_phonenumber_loading: boolean;
  update_profile_phone_loading: boolean;
  verify_phone_code_loading: boolean;
  request_phone_code_loading: boolean;
  update_password_loading: boolean;
  updated_password: boolean;
  updating_business_name: boolean;
  updating_business_owner: boolean;
  updated_business_owner: boolean;
  updated_business_name: boolean;
  brand_members: any;
  current_user_devices: CurrentDevicesProps[] | [];
  removing_device: boolean;
  removed_device: boolean;
}

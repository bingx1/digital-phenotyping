from django.test import TestCase

from locationServer.models import TbClient

class TbClientModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        TbClient.objects.create(
            uid=1, 
            clinician_id='2', 
            password='passord'
        )

    # ------------ test label ----------- #

    # ------------ test max length ----------- #
    def test_clinician_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('clinician_id').max_length
        self.assertEqual(max_length, 255)

    def test_client_title_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('client_title').max_length
        self.assertEqual(max_length, 255)

    def test_first_name_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('first_name').max_length
        self.assertEqual(max_length, 255)

    def test_last_name_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('last_name').max_length
        self.assertEqual(max_length, 255)

    def test_date_of_birth_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('date_of_birth').max_length
        self.assertEqual(max_length, 255)

    def test_twitter_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('twitter_id').max_length
        self.assertEqual(max_length, 255)

    def test_facebook_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('facebook_id').max_length
        self.assertEqual(max_length, 255)

    def test_aware_device_id_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('aware_device_id').max_length
        self.assertEqual(max_length, 255)

    def test_password_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('password').max_length
        self.assertEqual(max_length, 255)

    # did not find email_address in TbClient
    def test_email_address_max_length(self):
        client = TbClient.objects.get(uid=1)
        max_length = client._meta.get_field('email_address').max_length
        self.assertEqual(max_length, 255)

    # ------------ test model func ----------- #
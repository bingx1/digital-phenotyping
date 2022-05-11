# Generated by Django 4.0.3 on 2022-05-10 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Locations',
            fields=[
                ('field_id', models.AutoField(db_column='_id', primary_key=True, serialize=False)),
                ('timestamp', models.FloatField(blank=True, null=True)),
                ('device_id', models.CharField(blank=True, max_length=150, null=True)),
                ('double_latitude', models.FloatField(blank=True, null=True)),
                ('double_longitude', models.FloatField(blank=True, null=True)),
                ('double_bearing', models.FloatField(blank=True, null=True)),
                ('double_speed', models.FloatField(blank=True, null=True)),
                ('double_altitude', models.FloatField(blank=True, null=True)),
                ('provider', models.TextField(blank=True, null=True)),
                ('accuracy', models.FloatField(blank=True, null=True)),
                ('label', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'locations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TbClient',
            fields=[
                ('uid', models.AutoField(primary_key=True, serialize=False)),
                ('clinicianid', models.CharField(db_column='clinicianId', max_length=255)),
                ('clienttitle', models.CharField(blank=True, db_column='clientTitle', max_length=255, null=True)),
                ('firstname', models.CharField(blank=True, db_column='firstName', max_length=255, null=True)),
                ('lastname', models.CharField(blank=True, db_column='lastName', max_length=255, null=True)),
                ('dateofbirth', models.CharField(blank=True, db_column='dateOfBirth', max_length=255, null=True)),
                ('textnotes', models.TextField(blank=True, db_column='textNotes', null=True)),
                ('twitterid', models.CharField(blank=True, db_column='twitterId', max_length=255, null=True)),
                ('facebookid', models.CharField(blank=True, db_column='facebookId', max_length=255, null=True)),
                ('awaredeviceid', models.CharField(blank=True, db_column='awareDeviceId', max_length=255, null=True)),
                ('password', models.CharField(max_length=255)),
                ('emailaddress', models.CharField(db_column='emailAddress', max_length=255)),
            ],
            options={
                'db_table': 'tb_client',
                'managed': False,
            },
        ),
    ]

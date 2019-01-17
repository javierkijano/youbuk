from __future__ import print_function
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from httplib2 import Http
from oauth2client import file, client, tools
import json

from google.cloud import firestore


'gcloud auth application-default login'


# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly',
          'https://www.googleapis.com/auth/cloud-platform',
           'https://www.googleapis.com/auth/datastore']

# The ID and range of a sample spreadsheet.
SPREADSHEET_ID = '11UxrTN3r7-8sWfajrWktrhsAB1UG6mb11Giv8BT_laA'
RANGE = 'A:Z'
SHEETS = ['CATEGORIES', 'POPULARS', 'SUBCATEGORIES', 'SERVICES',
          'CAT_SUBCAT_SERVICE_MAPPING', 'PROFESSIONAL_INFO',
          'PROFESSIONAL_ADDRESS', 'PROFESIONAL_SERVICES']

def main():
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    store = file.Storage('tokeen.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('client_secret_general.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service_sheets = build('sheets', 'v4', http=creds.authorize(Http()))

    data = {}

    # Call the Sheets API
    spreadSheet = service_sheets.spreadsheets()
    for sheet in SHEETS:
        print('... extracting sheet: ' + sheet)
        result = spreadSheet.values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=sheet+'!'+RANGE).execute()
        data[sheet] = result.get('values', [])




    # Add a new document
    db = firestore.Client(project='app-kbuscas', credentials=None, database='(default)')

    for collection in SHEETS:
        print('... extracting sheet: ' + collection)
        cols = data[collection][0]
        for row_i, row in enumerate(data[collection][1:len(data[collection])]):
            document = dict(zip(cols, [str(row_el) for row_el in row]))
            doc_ref = db.collection(collection).document(str(row_i))
            doc_ref.set(document)

if __name__ == '__main__':
    main()
    a=0
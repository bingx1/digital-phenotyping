#!python2.7
# -*- coding: utf-8 -*-
"""
Created by kun
"""

import requests, time
from math import sin, asin, cos, sqrt, radians
import numpy
import matplotlib
import pylab
from scipy.cluster.vq import kmeans2, whiten

from scipy.spatial.distance import pdist, squareform
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt
import pandas as pd


def haversine(lonlat1, lonlat2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lat1, lon1 = lonlat1
    lat2, lon2 = lonlat2
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 3956  # Radius of earth in kilometers. Use 3956 for miles
    return c * r


def clustering_by_dbscan(in_dic):
    # X = pd.read_csv('2D_data_1.csv', sep='\t')
    # X=round(X,6)
    # print(X)
    X = pd.DataFrame(in_dic)

    distance_matrix = squareform(pdist(X, (lambda u, v: haversine(u, v))))

    db = DBSCAN(eps=0.3, min_samples=40, metric='precomputed')  # using "precomputed" as recommended
    y_db = db.fit_predict(distance_matrix)

    # db = DBSCAN(eps=2 / 6371., min_samples=5, algorithm='ball_tree', metric='haversine').fit(np.radians(coordinates))

    X['cluster'] = y_db

    results = {}
    for i in X.values:
        if i[2] not in results.keys():
            results[i[2]] = [(i[0], i[1])]
        else:
            if results[i[2]]:
                results[i[2]].append((i[0], i[1]))
            else:
                results[i[2]] = [(i[0], i[1])]
    print( results.keys())
    for k in results.keys():
        print( k, ": ", results[k])

    plt.scatter(X['double_latitude'], X['double_longitude'], c=X['cluster'])
    plt.show()


def clustering_by_kmeans2():
    matplotlib.use('Agg')
    pylab.close()

    xy = pd.read_csv('2D_data_1.csv', sep='\t')
    xy=round(xy, 6)
    # user的geo 信息
    # xy = numpy.array([[116.455788, 39.920767], [116.456065, 39.920965], [116.452312, 39.92304], [116.421385, 39.989539],
    #                   [116.455685, 39.92069], [116.455876, 39.920845], [116.455973, 39.920902], [116.455645, 39.920657],
    #                   [116.456022, 39.920934], [116.455685, 39.920691], [116.456023, 39.920671], [116.45596, 39.920864],
    #                   [116.455522, 39.920856], [116.455276, 39.920407], [116.455799, 39.920867],
    #                   [116.455349, 39.920425], [116.45511, 39.920377], [116.455318, 39.920442], [116.455298, 39.920474],
    #                   [116.455839, 39.920636], [116.455979, 39.921168], [116.454281, 39.920006], [116.45598, 39.920612],
    #                   [116.45388, 39.919584], [116.455474, 39.920737], [116.456009, 39.920641], [116.455439, 39.920574],
    #                   [116.455759, 39.920841], [116.455838, 39.920644], [116.455983, 39.920847],
    #                   [116.459803, 39.922041], [116.456029, 39.92088], [116.455539, 39.920603], [116.455989, 39.920851],
    #                   [116.455719, 39.920789], [116.45601, 39.92082], [116.456229, 39.920564], [116.455906, 39.920771],
    #                   [116.456248, 39.920868], [116.455805, 39.920544], [116.455896, 39.920758], [116.43692, 39.926767],
    #                   [116.454672, 39.92024], [116.454813, 39.917848], [116.381415, 40.00875], [116.422925, 39.980757],
    #                   [116.422849, 39.9808], [116.38107, 40.009217], [116.456078, 39.920747], [116.455242, 39.919515],
    #                   [116.455615, 39.920533], [116.422092, 39.991104], [116.454847, 39.917724],
    #                   [116.456686, 39.924316], [116.45575, 39.920642], [116.456713, 39.924413], [116.455846, 39.920828],
    #                   [116.422108, 39.991098], [116.422075, 39.991139], [118.775572, 31.97337], [118.776968, 31.97392],
    #                   [118.778187, 31.973121], [118.775695, 31.973254], [118.775302, 31.973807],
    #                   [118.776303, 31.973692], [118.777541, 31.973439], [118.776196, 31.973489],
    #                   [116.448944, 39.926799], [116.45487, 39.917804], [116.455762, 39.920645], [116.456146, 39.920441],
    #                   [116.455857, 39.920043], [116.455458, 39.920826], [116.455533, 39.920791],
    #                   [116.455426, 39.920896], [116.45566, 39.920811], [116.455696, 39.920621], [116.453667, 39.9259],
    #                   [116.466606, 39.886322], [116.455917, 39.92062]])

    # make some z vlues
    z = numpy.sin(xy[:, 1] - 0.2 * xy[:, 1])

    # whiten them
    z = whiten(z)

    # let scipy do its magic (k==3 groups)
    color_collection = ([0, 0, 0], [1, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0])

    res, idx = kmeans2(numpy.array(list(zip(xy[:, 0], xy[:, 1], z))), 3, iter=20, minit='points')
    for r in res:
        #address_text = my_get_address_text_by_location(r[1], r[0])
        print(r)
        time.sleep(1)
    print('************')
    print(idx)

    # convert groups to rbg 3-tuples.
    colors = ([color_collection[i] for i in idx])

    # show sizes and colors. each color belongs in diff cluster.
    pylab.scatter(xy[:, 0], xy[:, 1], s=20 * z + 9, c=colors)
    pylab.savefig('./cluster.png')


def clustering_by_dbscan_and_kmeans2(in_dic):
    # X=pd.read_csv('2D_data_1.csv',sep='\t')
    # X=round(X,6)
    X = pd.DataFrame(in_dic)
    distance_matrix = squareform(pdist(X, (lambda u, v: haversine(u, v))))

    # print(distance_matrix)

    db = DBSCAN(eps=0.4, min_samples=40, metric='precomputed')  # using "precomputed" as recommended
    y_db = db.fit_predict(distance_matrix)

    X['cluster'] = y_db

    results = {}
    for i in X.values:
        if i[2] not in results.keys():
            results[i[2]] = [[i[1], i[0]]]
        else:
            if results[i[2]]:
                results[i[2]].append([i[1], i[0]])
            else:
                results[i[2]] = [[i[1], i[0]]]
    print ("DBSCAN output: ", len(results), results.keys())
    print ("KMeans calc center as below: ")
    for k in results.keys():
        xy = numpy.array(results[k])
        z = numpy.sin(xy[:, 1] - 0.2 * xy[:, 1])

        z = whiten(z)

        temp=numpy.asarray(list(zip(xy[:, 0], xy[:, 1], z)))

        res, idx = kmeans2(temp, 1, iter=20, minit='points')
        #address_text = my_get_address_text_by_location(res[0][1], res[0][0])
        print(res) #, address_text)


if __name__ == "__main__":
    #clustering_by_kmeans2()
    clustering_by_dbscan('1')
    #clustering_by_dbscan_and_kmeans2()
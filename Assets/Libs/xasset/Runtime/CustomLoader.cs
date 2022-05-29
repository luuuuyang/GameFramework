using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

namespace xasset
{
    public enum LoadMode
    {
        LoadByName,
        LoadByNameWithoutExtension,
        LoadByRelativePath
    }

    [DisallowMultipleComponent]
    public class CustomLoader : MonoBehaviour
    {
        public string[] filters =
        {
            "Scenes", "Prefabs", "Textures"
        };

        public LoadMode loadMode = LoadMode.LoadByRelativePath;


        private string LoadByNameWithoutExtension(string assetPath)
        {
            if (filters == null || filters.Length == 0)
            {
                return null;
            }

            if (!Array.Exists(filters, assetPath.Contains))
            {
                return null;
            }

            var assetName = Path.GetFileNameWithoutExtension(assetPath);
            return assetName;
        }

        private string LoadByName(string assetPath)
        {
            if (filters == null || filters.Length == 0)
            {
                return null;
            }

            if (!Array.Exists(filters, assetPath.Contains))
            {
                return null;
            }

            var assetName = Path.GetFileName(assetPath);
            return assetName;
        }

        public void Initialize()
        {
            switch (loadMode)
            {
                case LoadMode.LoadByName:
                    Manifest.customLoader += LoadByName;
                    break;
                case LoadMode.LoadByNameWithoutExtension:
                    Manifest.customLoader += LoadByNameWithoutExtension;
                    break;
                default:
                    Manifest.customLoader = null;
                    break;
            }
        }
    }
}